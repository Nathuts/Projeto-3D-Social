/*------------------------------------------------
    Page Loader
-------------------------------------------------*/
// $(window).on('load', function () {
//     setTimeout(function () {
//         $('.page-loader').fadeOut();
//     }, 500);
// });

function pageLoaded()
{
    $('.page-loader').fadeOut();
}

function pageLoading()
{
    $('.page-loader').fadeIn();
}


$(document).ready(function () {
    
    /*------------------------------------------------
        Menu
    -------------------------------------------------*/
    $('body').on('click', '.navigation__sub > a', function (e) {
        e.preventDefault();

        $(this).parent().toggleClass('navigation__sub--toggled');
        $(this).next('ul').slideToggle(250);
    });


    /*------------------------------------------------
        Form group line
    -------------------------------------------------*/
    if($('.form-group--float')[0]) {
        $('.form-group--float').each(function () {
            var p = $(this).find('.form-control').val()

            if(!p.length == 0) {
                $(this).find('.form-control').addClass('form-control--active');
            }
        });

        $('body').on('blur', '.form-group--float .form-control', function(){
            var i = $(this).val();

            if (i.length == 0) {
                $(this).removeClass('form-control--active');
            }
            else {
                $(this).addClass('form-control--active');
            }
        });

        $(this).find('.form-control').change(function () {
            var x = $(this).val();

            if(!x.length == 0) {
                $(this).find('.form-control').addClass('form-control--active');
            }
        });
    }

    function templateParse(template,dict)
    {
        template = $(template)[0].outerHTML;
        $.each(dict,function(label,value){
            if( typeof value == 'object' )
            {
                $.each(value,function(label2,value2){
                    var _label = '{{'+label+'.'+ label2 +'}}';
                    while( template.indexOf(_label) != -1 )
                    {
                        template = template.replace(_label, value2);
                    }
                });
                return;
            }
            var _label = '{{'+label+'}}';
            while( template.indexOf(_label) != -1 )
            {
                template = template.replace(_label, value);
            }
        });
        return template;
    }


    /*------------------------------------------------
        PAGE: HOME
    -------------------------------------------------*/
    function pageHome()
    {

        var centerList = {}, 
            projectList = {};

        var dataAPIQueue = 
        [
            function()
            {
                Center.get().then(function(items){
                    items.forEach(function(item,i){
                        centerList[item.id] = item;
                    });
                    dataAPIQueue.shift()();
                }).catch(function(response){
                    console.log('Error while trying to get centers');
                    console.log(response);
                });
            },
            function()
            {
                Project.get().then(function(items){
                    items.forEach(function(item,i){
                        projectList[item.id] = item;
                    });
                    dataAPIQueue.shift()();
                }).catch(function(response){
                    console.log('Error while trying to get projects');
                    console.log(response);
                });
            },
            function()
            {
                Demand.get().then(function(items){
                    var template = $('.template-center'); 
                    items.forEach(function(item,i){
                        item.center = centerList[item.centerID];
                        item.project = projectList[item.projectID];
                        var _templateHTML = templateParse(template, item);
                        $(_templateHTML).show();
                        $("#grid .column").eq(i%3).append(_templateHTML);
                    });
                    $(template).remove();
                    $("#grid .column > .card").fadeIn(300);
                    animateCharts();
                    pageLoaded();
                    dataAPIQueue.shift()();
                }).catch(function(response){
                    console.log('Error while trying to get demands');
                    console.log(response);
                    pageLoaded();
                }); 
            },
            function()
            {
                /// FILL FORM
                var optionList = [];
                $.each(projectList, function(id,project){
                    optionList.push("<option value='" + id + "'>"+ project.name +"</option>");
                });
                $('[name=projectId]').append(optionList.join('')); 
            }
        ];

        dataAPIQueue.shift()();

        $('form').on('submit',function(e){
            e.preventDefault();
            pageLoading();
            
            var newDemand = Demand.instance();
            document.querySelectorAll('form [name]').forEach(function(el){
                newDemand[el.name] = el.value.trim();
            });
            newDemand['projectId'] = parseInt(newDemand['projectId']);

            Demand.add(newDemand)
            .then(function(response){
                pageLoaded();
                if( response.status == 200 )
                {
                    alert('Solicitação adicionado com sucesso');
                }
                else 
                {
                    alert('Um erro ocorreu e a Solicitação não foi adicionado');    
                }
                location.reload();
            }) 
            .catch(function(){  
                pageLoaded();
                alert('Um erro ocorreu e a Solicitação não foi adicionado');
                location.reload();
            }); 
            
        });


    }

    /*------------------------------------------------
        PAGE: PROJECTS
    -------------------------------------------------*/

    function pageProjects()
    {
        var dataAPIQueue = 
        [
            function()
            {
                Project.get().then(function(items){
                    var template = $('.template-project'); 
                    items.forEach(function(item,i){
                        var _templateHTML = templateParse(template, item);
                        $(_templateHTML).show();
                        $("#grid .column").eq(i%3).append(_templateHTML);
                    });
                    $(template).remove();
                    $("#grid .column > .card").fadeIn(300); 
                    pageLoaded();
                }).catch(function(response){
                    console.log('Error while trying to get demands');
                    console.log(response);
                    pageLoaded();
                }); 
            }
        ];
        dataAPIQueue.shift()();

        function addProject(data)
        {
            
            return Project.add(data)
            .then(function(response){
                return response;
            }) 
            .catch(function(response){
                return response;
            });
            
        }

        $('#form-project').on('submit',function(e)
        {
            e.preventDefault();
            pageLoading();
            var newProject = Project.instance();
            newProject.name = $('[name=name]').val();
            newProject.description = $('[name=description]').val();
            newProject.file = $('[name=file]').val();
            addProject(newProject)
            .then(function(){
                pageLoaded();
                alert('Projeto adicionado com sucesso');
                location.reload();
            })
            .catch(function(){ 
                pageLoaded();
                alert('Um erro ocorreu e o projeto não foi adicionado');
                location.reload();
            }); 
        });

        $('form button[type=submit]').attr('disabled',true);


    }


    /*------------------------------------------------
        PAGE CALLS
    -------------------------------------------------*/
    $('.template-center')[0] && pageHome();
    $('.template-project')[0] && pageProjects();


});