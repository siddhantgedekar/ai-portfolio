import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import google.generativeai as genai

# 1. load the secret key from .env file
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

# 2. configure AI
genai.configure(api_key=api_key)
model = genai.GenerativeModel('gemini-2.5-flash') # A fast, efficient model

# Implementing memory for context retention
chat_session = model.start_chat(history=[])

# 3. create the Flask app
app = Flask(__name__)
CORS(app)

# a dictionary to store separate chat sessions
user_sessions = {}

# This is a "Route". It tells the server what to do 
# When someone visits the homepage '/'
@app.route('/')
def home():
    return "AI Server is Online."

@app.route('/chat', methods=['POST'])
def chat():
    # 1. retrieve data from js
    data = request.json
    user_message = data.get('message', '')
    user_id = data.get('user_id') # frontend MUST send it..!!

    # 2. Check if user session exists, else create one
    if user_id not in user_sessions:
        # create a new chat memory for them
        user_sessions[user_id] = model.start_chat(history=[])

    # 3. Get the user's chat session
    current_session = user_sessions[user_id]

    # try:
        # 4. Ask Gemini the question
        # response = model.generate_content(user_message)
        # instead of above code...
        # response = chat_session.send_message(user_message)
    response = current_session.send_message(user_message)

        # 5. Extract the text from response
        # bot_reply = response.text
    bot_reply = response.text
    
    return jsonify({'reply': bot_reply})
    
    # except Exception as e:
    #     print(f'Error: {e}')
    #     return jsonify({"reply": "My brain is tired. Try again later."}), 500


# This checks if the script is running directly
if __name__ == '__main__':
    app.run(debug=True)