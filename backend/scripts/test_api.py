import requests

# Base URL of your API
BASE_URL = 'http://127.0.0.1:8000/api/persons/'

# Helper function to print responses
def print_response(response):
    print(f"Status Code: {response.status_code}")
    try:
        # Attempt to parse JSON only if the response has content
        if response.content:
            print(f"Response JSON: {response.json()}")
        else:
            print("Response JSON: No content")
    except ValueError as e:
        # Handle cases where JSON parsing fails
        print(f"Response JSON: Error decoding JSON - {e}")
    print("-" * 40)

# Test GET all persons
def test_get_all_persons():
    print("Testing GET all persons...")
    response = requests.get(BASE_URL)
    print_response(response)

# Test GET filtered persons
def test_get_filtered_persons(filter_name):
    print(f"Testing GET persons filtered by name: {filter_name}...")
    response = requests.get(BASE_URL, params={'filter': filter_name})
    print_response(response)

# Test POST a new person
def test_create_person():
    print("Testing POST a new person...")
    new_person = {
        'name': 'Adam',
        'age': 28,
        'city': 'Wonderland',
        'email': 'alice@example.com',
        'phone': '01278542103'
    }
    response = requests.post(BASE_URL, json=new_person)
    print_response(response)
    return response.json().get('id')    # Return the ID of the created person

# Test PUT (update) an existing person
def test_update_person(person_id):
    print(f"Testing PUT (update) person with ID: {person_id}...")
    updated_person = {
        'name': 'Alice Updated',
        'age': 29,
        'city': 'Updated City',
        'email': 'alice.updated@example.com',
        # 'phone': '987-654-3210',
        'phone': '123456781'
    }
    response = requests.put(f"{BASE_URL}{person_id}/", json=updated_person)
    print_response(response)

# Test DELETE a person
def test_delete_person(person_id):
    print(f"Testing DELETE person with ID: {person_id}...")
    response = requests.delete(f"{BASE_URL}{person_id}/")
    print_response(response)

# Main function to run all tests
def main():
    test_get_all_persons()
    test_get_filtered_persons('adam')
    person_id = test_create_person()
    test_update_person(person_id)
    test_delete_person(person_id)

if __name__ == "__main__":
    main()