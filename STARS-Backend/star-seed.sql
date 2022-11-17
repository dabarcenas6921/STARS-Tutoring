-- Creates users automatically for testing. Can be filled up with loads of fake data.

INSERT INTO users (password, account_type, first_name, last_name, email, panther_id)
VALUES
('$2b$13$uBTXe8TevNreigRUVAdiaOdyjjjx48wKpXG4FVinU5ucnMYgef0qC','student','David','Barcenas','dbarc021@fiu.edu', 1234567),
('$2b$13$uBTXe8TevNreigRUVAdiaOdyjjjx48wKpXG4FVinU5ucnMYgef0qC','tutor','Mike','Johnson','mike@fiu.edu', 1234567),
('$2b$13$uBTXe8TevNreigRUVAdiaOdyjjjx48wKpXG4FVinU5ucnMYgef0qC', 'student', 'David', 'Barcenas', 'david@fiu.edu', 1234567),
('$2b$13$uBTXe8TevNreigRUVAdiaOdyjjjx48wKpXG4FVinU5ucnMYgef0qC','tutor','John','Doe','john@fiu.edu', 1234567),
('$2b$13$uBTXe8TevNreigRUVAdiaOdyjjjx48wKpXG4FVinU5ucnMYgef0qC','tutor','Jane','Doe','jane@fiu.edu', 1234567);


INSERT INTO courses (course, tutors)
VALUES
('COP4555', ARRAY [2,4]),
('COP4338', ARRAY [5]),
('CDA3102', ARRAY [2,4,5]);

INSERT INTO schedules (tutor_id, tutor_schedules)
VALUES
(2, ARRAY [['2022-11-20 12:00:00', '2022-11-20 16:00:00'], ['2022-11-21 14:00:00', '2022-11-21 18:00:00']]),
(4, ARRAY [['2022-11-22 10:00:00', '2022-11-22 12:00:00'], ['2022-11-23 15:00:00', '2022-11-23 17:00:00']]),
(5, ARRAY [['2022-11-18 17:00:00', '2022-11-18 18:00:00'], ['2022-11-19 16:00:00', '2022-11-19 19:00:00']]);

INSERT INTO appointments (student_id, tutor_id, app_start_time, app_end_time, course)
VALUES
(3, 2, '2022-11-15 14:00:00', '2022-11-15 16:00:00', 'COP4338');