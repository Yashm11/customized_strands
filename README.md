# Strands - Customizable Word Grid Game

## 📌 Project Title & Description

This project is a customizable version of the NYT Strands game. Unlike the original, which restricts non-letter characters, this version allows for full customization, enabling users to create their own word grid puzzles with any character set. The goal is to replicate the Strands gameplay while removing unnecessary limitations.

## 🚀 Tech Stack

- **Frontend**: HTML, CSS, JavaScript (Vanilla JS)

- **Backend**: Python (Flask)

- **Web Server**: Nginx (for hosting)

- **Public Tunneling**: Ngrok (for external access)

- **Virtual Environment**: Python venv

## 📊 Installation & Usage Instructions

### 1️⃣ Setup Virtual Environment

Run the provided script to create a virtual environment and install dependencies.

```
chmod +x setup.sh
./setup.sh
```

### 2️⃣ Run the Flask Server

Once dependencies are installed, start the server:

```
flask run --host=0.0.0.0 --port=5000
```

By default, the app will be available at http://localhost:5000

### 3️⃣ Optional: Hosting Publicly with Nginx & Ngrok

If you want to make your server publicly accessible:

```
Install Nginx

sudo apt update
sudo apt install nginx
```
#### Configure Nginx to Proxy Requests to Flask

Edit Nginx configuration:

```
sudo nano /etc/nginx/sites-available/strands
```
Add the following content:

```
server {
    listen 80;
    server_name _;
    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

Activate the config and restart Nginx:

```
sudo ln -s /etc/nginx/sites-available/strands /etc/nginx/sites-enabled/
sudo systemctl restart nginx
```

#### Set Up Ngrok

```
ngrok http 8000
```

This will provide a public URL to access the Flask app.

#### 📁 Project Structure

```
├── static/
│   ├── styles.css  # Stylesheet
│   ├── script.js   # Game logic
├── templates/
│   ├── index.html  # Main UI
├── words.json      # Word list for the game
├── app.py          # Flask backend
├── setup.sh        # Environment setup script
├── requirements.txt # Required dependencies
└── README.md       # Project documentation
```

#### 🎯 Key Features

✅ Customizable Word Grid - Define your own word set
✅ Mobile-Friendly - Improved touch interactions for selection
✅ Dynamic Styling - Colors and animations for user feedback
✅ Public Hosting Option - Deploy with Nginx & Ngrok

### 🖼 Screenshots / Visuals

![image](https://drive.google.com/file/d/1szXcKg7q1rpY0-50ezQ0Rt7Q7JKlQAuF/view?usp=sharing)

### 🔗 Live Demo

[🎥 Demo Video](https://youtu.be/q3wI32ICbAQ)

