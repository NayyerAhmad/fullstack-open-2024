sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML document (SPA page)
    deactivate server

    Note right of browser: The SPA is loaded with basic HTML structure.

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: JSON data containing notes [{ "content": "Note 1", "date": "2023-1-1" }, ...]
    deactivate server

    Note right of browser: The SPA dynamically loads and displays the notes using the fetched JSON data.
