sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa (new note data)
    activate server
    server-->>browser: Response (Success or confirmation)
    deactivate server

    Note right of browser: SPA updates the UI to reflect the newly added note.
