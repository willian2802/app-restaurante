from flask import Flask, render_template, request, jsonify, session
from flask_socketio import SocketIO
from MongoDB import add_new_restaurant, login_user, register_user

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

@app.route('/')
def acess_main_page():
    return render_template('main-page.html')

@app.route('/admin')
def acess_login_page():
    return render_template('admin.html')


#  Login and Register
@app.route('/login_register_staf', methods=['POST'])
def login():
    # clear session data
    session['user_id'] = ""
    session['authentication'] = ""
    session['authorization_level'] = ""
    
    # data structure
    data = request.get_json()
    print(data)
    username = data['username']
    restaurant_name = data['restaurant_name']
    password = data['password']
    action = data['action']

    if action == "login":
        login_status, authorization_level = login_user(username, password, restaurant_name)
        if login_status == False:
            return jsonify({'message': f'tentativa de login falhou.'})
        # add the authorization level
        session['authorization_level'] = authorization_level
        return jsonify({'message': f'Login bem-sucedido! Seja bem-vindo, {username}.'})
    else:
        login_status = register_user(username, password, restaurant_name)

    if login_status == False:
        return jsonify({'message': f'tentativa de registro falhou.'})

    # initialize the session
    session['user_id'] = username
    # session['authentication'] = ""
    session['restaurant_name'] = restaurant_name


    return jsonify({'message': f'Login bem-sucedido! Seja bem-vindo, {username}.'})


@app.route('/manegement_page')
def manegement_page():

    # if session['user_id'] == "":
    #     return render_template('admin.html')

    return render_template('manegement-page.html')

# Create new restaurant
@app.route('/create_restaurant', methods=['POST'])
def create_restaurant():
    new_restaurant_data = request.get_json()

    # restaurant_name, gerent_name and password to the gerernt acount
    create_restaurant = add_new_restaurant(new_restaurant_data)

    if create_restaurant == True:
        return jsonify({'message': f'Login bem-sucedido! Seja bem-vindo.'})
    else:
        return jsonify({'message': f'Erro ao criar o restaurante.'})


if __name__ == '__main__':
    app.run(debug=True)