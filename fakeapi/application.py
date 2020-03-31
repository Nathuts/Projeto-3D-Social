# -*- coding: utf-8 -*-
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/api/Center")
def centerGET():
    return jsonify([{"name":"Centro de Teste","street":"rua de teste","addressNumber":"120","district":"Vila de teste","city":"São Paulo","zipCode":"00000-00","document":"00.000.000","id":1,"created":"2020-03-28T11:01:04","modificated":"2020-03-28T11:01:04"}])

@app.route("/api/Center/<int:id>")
def centerGETById(id):
    return jsonify({"name":"Centro de Teste","street":"rua de teste","addressNumber":"120","district":"Vila de teste","city":"São Paulo","zipCode":"00000-00","document":"00.000.000","id":1,"created":"2020-03-28T11:01:04","modificated":"2020-03-28T11:01:04"})


@app.route("/api/Demand")
def demandGET():
    return jsonify([{"centerID":1,"projectID":1,"totalNeed":150,"totalDelivered":87,"observations":"O produto precisa sem impresso o quanto antes para atender a demandas do hospital","id":1,"created":"2020-03-30T00:48:18","modificated":"2020-03-30T00:48:18"}])

@app.route("/api/Project", methods=["GET","POST"])
def projectGET():
    if request.method == "GET" :
        return jsonify([{"name":"Máscara","description":"Equipamento com haste que segura uma folha de acetato que garante maior proteção aos profissionais de saúde.","file":"mask.zip","id":1,"created":"2020-03-30T00:43:54","modificated":"2020-03-30T00:43:54"}])
    else :
        return "ok"

@app.route("/api/Project/<int:id>")
def projectGETById(id):
    return jsonify({"name":"Máscara","description":"Equipamento com haste que segura uma folha de acetato que garante maior proteção aos profissionais de saúde.","file":"mask.zip","id":1,"created":"2020-03-30T00:43:54","modificated":"2020-03-30T00:43:54"})
