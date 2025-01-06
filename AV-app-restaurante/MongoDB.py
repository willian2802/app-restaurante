from flask import session
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

# Conecta ao MongoDB pegando o url pelo arquivo .env
# no Mongo_URI bote o seu URI do seu mongoDB atlas, no arquivo URL.env

import os
from dotenv import load_dotenv

dotenv_path = os.path.join(os.path.dirname(__file__), 'URL.env')
load_dotenv(dotenv_path)

uri = os.environ.get('MONGO_URI', None)

if uri is None:
    print("Erro: Variável de ambiente MONGO_URI não encontrada")
    exit(1)

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

db = client['restaurante_app']
restaurant_collection = db['restaurant_data']

# add new restaurant to the DB
def add_new_restaurant(new_restaurant_data):

    list_to_insert = new_restaurant_data

    # creat a new restaurant if the name is not being used in the database       
    if not restaurant_collection.find_one({
        "restaurant_name": list_to_insert['restaurant_name']
    }):
        new_restaurant_doc = {
            "restaurant_name": list_to_insert['restaurant_name'],
            "gerent_name": list_to_insert['username'],
            "password": list_to_insert['password'],
            "staf_list": []  # array vazio para armazenar funcionários
        }
    restaurant_collection.insert_one(new_restaurant_doc)
    return True


#     new_staff_member = {
#     "nome": "Willian",
#     "status": "online",
#     "nivel_de_autorizacao": 1
# }
# restaurant_collection.update_one({
#     "restaurant_name": list_to_insert['restaurant_name']
# }, {
#     "$push": {
#         "staf_list": new_staff_member
#     }
# })
        
        # Cria um novo restaurante
        # restaurant_collection.insert_one(list_to_insert)
        # return True

    # # Atualiza o restaurante com o novo restaurante
    # restaurant_collection.update_one({
    #     "restaurant_name": list_to_insert['restaurant_name'],
    # }, {
    #     "$set": {
    #         "gerent_name": list_to_insert['gerent_name'],
    #         "password": list_to_insert['password']
    #     }
    # }):
    
    # restaurant_collection.insert_one(list_to_insert)

# add_new_restaurant()


def insert_list(list_to_insert):
    
    list = list_to_insert

    # Cria um novo historico de usario se nao existir nenhum com o mesmo nome de usario
    if not shopping_history_collection.find_one({
        "user_name": list['user_id'],
    }):
        # Cria um novo historico de usario
        shopping_history_collection.insert_one({
            "user_name": list['user_id'],
        })
    
    # Atualiza o historico do usario com a nova lista
    shopping_history_collection.update_one({
                "user_name": list['user_id'],
            }, {
                "$push": {
                    "lista": {
                        "list_name": list['list_name'],
                        "created_at": list['created_at'],
                        "items": list['items'],
                        "total_price": list['total_price']
                    }
                }
            })

    return True

def get_user_history(user_id):
    user_data = shopping_history_collection.find_one({"user_name": user_id})

    if user_data is None:
        return False
    return user_data


# login and register user
def login_register_user(username, password, restaurant_name,action):

    if action == "login":
        existing_user = restaurant_collection.find_one({"username": username,"restaurant_name": restaurant_name})
        if existing_user:
            return (True, "Esse nome de usuário ja esta sendo usado")
    else:
        # verify if the username is already being used in the DB
        existing_user = restaurant_collection.find_one({"username": username,"restaurant_name": restaurant_name})
        if existing_user:
            return (False, "Esse nome de usuário ja esta sendo usado")
        
        # existing_user = restaurant_collection.find_one


        restaurant_collection.insert_one({'username': username, 'password': password})
    return True

    return jsonify({'message': f'Login bem-sucedido! Seja bem-vindo, {username}.'})


def register_user(username, password, restaurant_name):
    # verify if the username is already being used in the DB,
    #  if yes return False
    existing_user = restaurant_collection.find_one({"username": username,"restaurant_name": restaurant_name})
    if existing_user:
        return False
    else:
        # create and add a new staf member to the restaurant in the DB
        new_staff_member = {
            "username": username,
            "password": password,
            "authorization_level": 3
        }
        restaurant_collection.update_one({
            "restaurant_name": restaurant_name
        }, {
            "$push": {
                "staf_list": new_staff_member
            }
        })
        return True

# Login
def login_user(username, password, restaurant_name):

    # verify if the username and password is the same has the in the DB
    existing_user = restaurant_collection.find_one({"restaurant_name": restaurant_name, "username": username, "password": password})
    if existing_user:
        return True
    
    return False