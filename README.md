# AndNowUKnow

## Installation

- Clone this repository and install dependencies

    ```command
    git clone https://github.com/Anuknow/py-anukD.git
    pip install -r requirements.txt
    cd django_models/frontend
    npm install      
  ```
- Create DB
    ```command
    python manage.py makemigrations
    python manage.py migrate
    python manage.py createsuperuser
    ```  

- Run

    ```command
    cd frontend
    npm run build
    cd ..
    python manage.py runserver
    ```    