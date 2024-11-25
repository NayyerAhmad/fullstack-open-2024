```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note (note=Nayyer)
    activate server
    server-->>browser: Response (Success / Confirmation)
    deactivate server

    Note right of browser: The note is saved and the page reloads.

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document with updated notes
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: JSON data containing updated notes [{ "content": "Nayyer", ... }]
    deactivate server

    Note right of browser: The browser processes the new data and updates the UI to display the new note.
