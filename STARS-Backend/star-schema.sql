CREATE TABLE users(
    id              SERIAL PRIMARY KEY,
    password        TEXT NOT NULL,
    account_type    TEXT NOT NULL,
    first_name      TEXT NOT NULL,
    last_name       TEXT NOT NULL,
    email           TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1),
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    panther_id      INTEGER
);

CREATE TABLE courses (
    course         TEXT PRIMARY KEY,
    tutors         INTEGER[]
);

CREATE TABLE schedules (
    tutor_id           INTEGER PRIMARY KEY,
    tutor_schedules    TIMESTAMP[][] NOT NULL,
    FOREIGN KEY (tutor_id) REFERENCES users(id)  
);

CREATE TABLE appointments(
    appointment_id     SERIAL PRIMARY KEY,
    student_id         INTEGER NOT NULL,
    tutor_id           INTEGER NOT NULL,
    app_start_time     TIMESTAMP NOT NULL,
    app_end_time       TIMESTAMP NOT NULL,
    FOREIGN KEY (student_id) REFERENCES users(id),
    FOREIGN KEY (tutor_id) REFERENCES users(id)
);