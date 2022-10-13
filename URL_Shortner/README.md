# TinyApp Project

TinyApp is a Full-Stack RESTful Web application built on Node and Express!
* Short URLs have become ubiquitous.
* Especially popular within social networking services, short URLs have seen a significant increase in their usage over the past years, mostly due to Twitter’s restriction of message length to 140 characters. 
* It allows users to shorten URLs!
# URL SHortner
Short URLs have become ubiquitous. Especially popular within social networking services, short URLs have seen a significant increase in their usage over the past years, mostly due to Twitter’s restriction of message length to 140 characters. We provide a first characterization on the usage of short URLs. Specifically, our goal is to examine the content short URLs point to, how they are published, their popularity and activity over time, as well as their potential impact on the performance of the web. Our study is based on traces of short URLs as seen from two different perspectives: 
i) collected through a large-scale crawl of URL shortening services, and 
ii) collected by crawling Twitter messages. The former provides a general characterization on the usage of short URLs, while the latter provides a more focused view on how certain communities use shortening services. Our analysis highlights that domain and website popularity, as seen from short URLs, significantly differs from the distributions provided by well publicised services such as Alexa. The set of most popular websites pointed to by short URLs appears stable over time, despite the fact that short URLs have a limited high popularity lifetime. Surprisingly short URLs are not ephemeral, as a significant fraction, roughly 50%, appears active for more than three months. Overall, our study emphasizes the fact that short URLs reflect an “alternative” web and, hence, provide an additional view on web usage and content consumption complementing traditional measurement sources. Furthermore, our study reveals the need for alternative shortening architectures that will eliminate the non-negligible performance penalty imposed by today’s shortening services.
## <ins>Features</ins>
 Secure User Registration and Login system
  * encrypted cookies
  * Hashed and Salted passwords

 Account based URL storage
  * Your shortened URLs saved for future use!

Permission based URL viewing
  * Only you can see your saved URL's.
  * Anyone can access the intended website through your ShortURL link.

Utilize method-override to follow REST conventions.

### <ins>BREAD Functionality</ins>
* Browse all your saved URL's
* Read specific URL info
* Edit you your saved urls
* Add new URLs
* Delete your saved URLS

## <ins>Final Product</ins>



| *Login*      | *Register*      |
|------------|-------------|
| <img src=https://user-images.githubusercontent.com/52307383/111716095-f243f800-881a-11eb-9333-27eb7cd280ab.png width="300">| <img src=https://user-images.githubusercontent.com/52307383/111716127-fec85080-881a-11eb-896d-cf01a00eb675.png width="300"> |


| *My URLs*   | 
|------------|
| <img src=https://user-images.githubusercontent.com/52307383/111716159-0e479980-881b-11eb-8ffd-d6d0d1731363.png width="630"> |


| *Create URLs*     | *Edit URLs*      |
|------------|-------------|
| <img src=https://user-images.githubusercontent.com/52307383/111716245-38995700-881b-11eb-95a1-33698abcee58.png width="300"> | <img src=https://user-images.githubusercontent.com/52307383/111716270-46e77300-881b-11eb-9c7e-547bd2b31f15.png width="300"> |

## <ins>Dependencies</ins> 

- Node.js
- Express
- bcrypt
- body-parser
- cookie-session
- EJS
- morgan
- Method-Override

## Getting Started

- Install all dependencies (using the `npm install` command).
- Run the development web server using the `node express_server.js` command.
  * *Current server running on http://localhost:8080/*
- Create an account Via Register
- shortened URL's redirected to desired site through /u/'shortURL'


> *Gradient background css provided by uigradients.com*
