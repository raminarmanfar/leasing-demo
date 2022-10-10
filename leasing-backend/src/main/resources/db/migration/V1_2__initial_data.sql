INSERT INTO customer(id, firstname, lastname, birthdate) VALUES (100,'Ramin', 'Armanfar', STR_TO_DATE('26-06-1980', '%d-%m-%Y'));
INSERT INTO customer(id, firstname, lastname, birthdate) VALUES (200,'Robert', 'Mueller', STR_TO_DATE('17-02-1988', '%d-%m-%Y'));
INSERT INTO customer(id, firstname, lastname, birthdate) VALUES (300,'Julia', 'Star', STR_TO_DATE('21-10-1984', '%d-%m-%Y'));
INSERT INTO customer(id, firstname, lastname, birthdate) VALUES (400,'Albert', 'Einstein', STR_TO_DATE('14-03-1985', '%d-%m-%Y'));
INSERT INTO customer(id, firstname, lastname, birthdate) VALUES (500,'Elon', 'Musk', STR_TO_DATE('22-08-1983', '%d-%m-%Y'));

INSERT INTO vehicle(id, brand, model, model_year, vin, price) VALUES (10,'BMW', 'X3', 2022, '102030', 45350);
INSERT INTO vehicle(id, brand, model, model_year, vin, price) VALUES (20,'Mercedes-Benz', 'E Class', 2020, '123456', 48120);
INSERT INTO vehicle(id, brand, model, model_year, vin, price) VALUES (30,'BMW', 'X6', 2021, '223344', 62500);
INSERT INTO vehicle(id, brand, model, model_year, vin, price) VALUES (40,'Volvo', 'XC60', 2022, '336699', 48680);
INSERT INTO vehicle(id, brand, model, model_year, vin, price) VALUES (50,'Volkswagen (VW)', 'Tiguan', 2020, '112233', 42570);
INSERT INTO vehicle(id, brand, model, model_year, vin, price) VALUES (60,'Ford', 'Mustang', 2016, 'F1415', 86500);

INSERT INTO leasing_contract(customer_id, vehicle_id, contract_number, monthly_rate) VALUES (100, 10, 1000, 350);
INSERT INTO leasing_contract(customer_id, vehicle_id, contract_number, monthly_rate) VALUES (200, 30, 2000, 480);
INSERT INTO leasing_contract(customer_id, vehicle_id, contract_number, monthly_rate) VALUES (100, 20, 3000, 375);
INSERT INTO leasing_contract(customer_id, vehicle_id, contract_number, monthly_rate) VALUES (300, 50, 4000, 295);
