import { SnippetCollection } from '../types';

export const defaultSnippets: Record<string, SnippetCollection> = {
  java: {
    code: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
    suggestions: [
      'Create API client', 
      'Implement sorting algorithm', 
      'Generate data model class',
      'Add exception handling',
      'Create REST controller',
      'Implement authentication',
      'Add database connection'
    ],
    sort: `import java.util.Arrays;

public class SortingExample {
    public static void main(String[] args) {
        // Sample array
        int[] numbers = {9, 5, 1, 3, 8, 4, 2, 7, 6};
        
        // Using Arrays.sort() for sorting
        Arrays.sort(numbers);
        
        // Print the sorted array
        System.out.println("Sorted array: " + Arrays.toString(numbers));
        
        // Custom implementation of Quicksort
        int[] unsorted = {9, 5, 1, 3, 8, 4, 2, 7, 6};
        quickSort(unsorted, 0, unsorted.length - 1);
        System.out.println("Quick sorted: " + Arrays.toString(unsorted));
    }
    
    // Quicksort implementation
    private static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pivotIndex = partition(arr, low, high);
            quickSort(arr, low, pivotIndex - 1);
            quickSort(arr, pivotIndex + 1, high);
        }
    }
    
    private static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = low - 1;
        
        for (int j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                swap(arr, i, j);
            }
        }
        
        swap(arr, i + 1, high);
        return i + 1;
    }
    
    private static void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}`,
    api: `import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

public class ApiClientExample {
    private final HttpClient httpClient;
    
    public ApiClientExample() {
        this.httpClient = HttpClient.newBuilder()
            .version(HttpClient.Version.HTTP_2)
            .connectTimeout(Duration.ofSeconds(10))
            .build();
    }
    
    public String getRequest(String uri) throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
            .GET()
            .uri(URI.create(uri))
            .header("User-Agent", "Java HttpClient")
            .build();
            
        HttpResponse<String> response = httpClient.send(
            request, 
            HttpResponse.BodyHandlers.ofString()
        );
        
        return response.body();
    }
    
    public String postRequest(String uri, String jsonBody) throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
            .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
            .uri(URI.create(uri))
            .header("Content-Type", "application/json")
            .build();
            
        HttpResponse<String> response = httpClient.send(
            request, 
            HttpResponse.BodyHandlers.ofString()
        );
        
        return response.body();
    }
    
    public static void main(String[] args) {
        try {
            ApiClientExample client = new ApiClientExample();
            String response = client.getRequest("https://jsonplaceholder.typicode.com/posts/1");
            System.out.println(response);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}`,
    class: `public class User {
    // Private fields
    private final String id;
    private String username;
    private String email;
    private boolean active;
    
    // Constructor
    public User(String id, String username, String email) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.active = true;
    }
    
    // Getters and setters
    public String getId() {
        return id;
    }
    
    public String getUsername() {
        return username;
    }
    
    public void setUsername(String username) {
        this.username = username;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public boolean isActive() {
        return active;
    }
    
    public void setActive(boolean active) {
        this.active = active;
    }
    
    // Builder pattern
    public static class Builder {
        private String id;
        private String username;
        private String email;
        
        public Builder id(String id) {
            this.id = id;
            return this;
        }
        
        public Builder username(String username) {
            this.username = username;
            return this;
        }
        
        public Builder email(String email) {
            this.email = email;
            return this;
        }
        
        public User build() {
            return new User(id, username, email);
        }
    }
    
    // Factory method for Builder
    public static Builder builder() {
        return new Builder();
    }
    
    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", active=" + active +
                '}';
    }
}`,
    explanation: `This is a Java class definition that follows Object-Oriented Programming principles:

1. The class defines a "HelloWorld" program with a main method, which is the entry point for Java applications.

2. The "main" method:
   - Is declared as "public static void", meaning it's accessible from anywhere, doesn't require an instance, and doesn't return a value
   - Takes a String array parameter named "args" which can receive command line arguments

3. Inside the main method:
   - System.out.println() is used to output text to the console
   - "Hello, World!" is the string being printed

This is the standard template for basic Java programs. The code demonstrates proper Java syntax including:
- Class definition with proper braces
- Method declaration with appropriate modifiers
- String literal syntax with quotation marks
- Proper statement termination with semicolons`
  },
  kotlin: {
    code: `fun main() {
    println("Hello, World!")
}`,
    suggestions: [
      'Create coroutine',
      'Implement data class', 
      'Add extension function', 
      'Create sealed class hierarchy',
      'Implement flow collector',
      'Add suspend function',
      'Create ViewModel class'
    ],
    sort: `fun main() {
    // Sample array
    val numbers = mutableListOf(9, 5, 1, 3, 8, 4, 2, 7, 6)
    
    // Using built-in sort
    numbers.sort()
    println("Sorted list: $numbers")
    
    // Using sorted to create a new list
    val unsortedList = listOf(9, 5, 1, 3, 8, 4, 2, 7, 6)
    val sortedList = unsortedList.sorted()
    println("New sorted list: $sortedList")
    
    // Custom implementation of Quicksort
    val arrayToSort = intArrayOf(9, 5, 1, 3, 8, 4, 2, 7, 6)
    quickSort(arrayToSort, 0, arrayToSort.size - 1)
    println("Quick sorted: \${arrayToSort.joinToString()}")
}

// Quicksort implementation
fun quickSort(arr: IntArray, low: Int, high: Int) {
    if (low < high) {
        val pivotIndex = partition(arr, low, high)
        quickSort(arr, low, pivotIndex - 1)
        quickSort(arr, pivotIndex + 1, high)
    }
}

fun partition(arr: IntArray, low: Int, high: Int): Int {
    val pivot = arr[high]
    var i = low - 1
    
    for (j in low until high) {
        if (arr[j] <= pivot) {
            i++
            arr.swap(i, j)
        }
    }
    
    arr.swap(i + 1, high)
    return i + 1
}

fun IntArray.swap(i: Int, j: Int) {
    val temp = this[i]
    this[i] = this[j]
    this[j] = temp
}`,
    api: `import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.net.HttpURLConnection
import java.net.URL

class ApiClient {
    suspend fun get(url: String): String = withContext(Dispatchers.IO) {
        val connection = URL(url).openConnection() as HttpURLConnection
        connection.requestMethod = "GET"
        connection.setRequestProperty("Content-Type", "application/json")
        connection.setRequestProperty("Accept", "application/json")
        connection.connectTimeout = 10000
        
        try {
            val inputStream = connection.inputStream
            val response = inputStream.bufferedReader().use { it.readText() }
            inputStream.close()
            response
        } finally {
            connection.disconnect()
        }
    }
    
    suspend fun post(url: String, jsonBody: String): String = withContext(Dispatchers.IO) {
        val connection = URL(url).openConnection() as HttpURLConnection
        connection.requestMethod = "POST"
        connection.setRequestProperty("Content-Type", "application/json")
        connection.setRequestProperty("Accept", "application/json")
        connection.doOutput = true
        connection.connectTimeout = 10000
        
        try {
            val outputStream = connection.outputStream
            outputStream.write(jsonBody.toByteArray())
            outputStream.flush()
            outputStream.close()
            
            val inputStream = connection.inputStream
            val response = inputStream.bufferedReader().use { it.readText() }
            inputStream.close()
            response
        } finally {
            connection.disconnect()
        }
    }
}

// Usage example with coroutines
suspend fun fetchData() {
    val client = ApiClient()
    try {
        val response = client.get("https://jsonplaceholder.typicode.com/posts/1")
        println(response)
    } catch (e: Exception) {
        println("Error: \${e.message}")
    }
}`,
    class: `data class User(
    val id: String,
    var username: String,
    var email: String,
    var isActive: Boolean = true
) {
    // Additional properties and methods can be added here
    val displayName: String
        get() = "@$username"
    
    fun deactivate() {
        isActive = false
    }
    
    fun reactivate() {
        isActive = true
    }
    
    override fun toString(): String {
        return "User(id='$id', username='$username', email='$email', isActive=$isActive)"
    }
    
    // Companion object for factory methods
    companion object {
        fun createWithRandomId(username: String, email: String): User {
            val randomId = java.util.UUID.randomUUID().toString()
            return User(randomId, username, email)
        }
    }
}

// Extension functions
fun User.validateEmail(): Boolean {
    val emailRegex = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$"
    return email.matches(emailRegex.toRegex())
}

// Usage example
fun main() {
    val user = User.createWithRandomId("johndoe", "john@example.com")
    println(user)
    println("Display name: \${user.displayName}")
    println("Email valid: \${user.validateEmail()}")
    
    user.deactivate()
    println("After deactivation: $user")
}`,
    explanation: `This is a Kotlin program that demonstrates Kotlin's concise syntax:

1. The program defines a "main" function which serves as the entry point.
   - Unlike Java, Kotlin doesn't require a class to contain the main function
   - The "fun" keyword is used to declare functions in Kotlin

2. The main function:
   - Doesn't require parameters (though it can accept args if needed)
   - Doesn't need a return type specification since it doesn't return anything (returns Unit implicitly)

3. Inside the main function:
   - The println() function prints text to the console
   - "Hello, World!" is the string being printed
   - Note there's no semicolon at the end (optional in Kotlin)

This code showcases Kotlin's philosophy of reducing boilerplate compared to Java:
- No class declaration needed
- No public modifier (public by default)
- No static keyword (top-level functions are effectively static)
- Optional parameter for main function
- No semicolons required`
  }
};