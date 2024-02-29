const APIurl = 'http://127.0.0.1:8000/api/tasks'

        document.getElementById('postForm').addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the default form submission
            const formData = new FormData(this);

            fetch(this.action, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                // Handle the response from the API
                console.log(data)
                location.href = "../index.html"
            })
            .catch(error => {
                console.error('Error:', error);
                // document.getElementById('response').textContent = 'Error occurred. Please try again.';
            });
        });
