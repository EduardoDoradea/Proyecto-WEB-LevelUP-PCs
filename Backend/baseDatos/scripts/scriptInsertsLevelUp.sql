
USE DB_ProyectoWebFinal3;

INSERT INTO Marca (nombre)
VALUES ('ACER'),
	   ('AMD'),
	   ('ASUS'),
	   ('HP'),
	   ('INTEL'),
	   ('LENOVO'),
	   ('MSI'),
	   ('NVIDIA'),
	   ('CORSAIR'), 
	   ('G.SKILL'), 
	   ('KINGSTON'),
	   ('SAMSUNG'),
	   ('WESTERN DIGITAL'),
	   ('CRUCIAL'),
	   ('SEAGATE'),
	   ('GIGABYTE'),
	   ('EVGA'),
	   ('SEASONIC'),
	   ('NZXT'),
	   ('LIAN LI'),
	   ('NOCTUA'),
	   ('ARCTIC');

select * from Marca

INSERT INTO Proveedor (nombre, telefono, correo)
VALUES ('Juan Lopez', 74204232, 'juanlopez123@gmail.com'),
	   ('Elva Maria', 34593024, 'elvama345@hotmail.com'),
	   ('Andres Amaya', 12039849, 'andy777@gmail.com');

select * from Proveedor

INSERT INTO Producto (nombre, idMarca, tipo, precio, cantidad, descripcion)
VALUES('Intel Core i9-14900K', 5, 'procesadores', 589.99, 15, 'cores: "24 núcleos, threads: "32 hilos, baseClock: "3.2 GHz, boostClock: "6.0 GHz'),
('AMD Ryzen 9 7950X', 2, 'procesadores', 699.99, 12, 'cores: "16 núcleos, threads: "32 hilos, baseClock: "4.5 GHz, boostClock: "5.7 GHz'),
('Intel Core i7-14700K', 5, 'procesadores', 419.99, 20, 'cores: "20 núcleos, threads: "28 hilos, baseClock: "3.4 GHz, boostClock: "5.6 GHz'),
('AMD Ryzen 7 7800X3D', 2, 'procesadores', 449.99, 8, 'cores: "8 núcleos, threads: "16 hilos, baseClock: "4.2 GHz, boostClock: "5.0 GHz'),
('Intel Core i5-14600K', 5, 'procesadores', 319.99, 25, 'cores: "14 núcleos, threads: "20 hilos, baseClock: "3.5 GHz, boostClock: "5.3 GHz');

INSERT INTO Producto(nombre, idMarca, tipo, precio, cantidad, descripcion)
VALUES
('NVIDIA RTX 4090', 8, 'tarjetas-graficas', 1899.99, 5, 'memory: "24GB GDDR6X, cores: "16384 CUDA, tdp: "450W'),
('NVIDIA RTX 4080 SUPER', 8, 'tarjetas-graficas', 1199.99, 10, 'memory: "16GB GDDR6X, cores: "10240 CUDA, tdp: "320W'),
('AMD Radeon RX 7900 XTX', 2, 'tarjetas-graficas', 999.99, 7, 'memory: "24GB GDDR6, cores: "6144 Stream, tdp: "355W'),
('NVIDIA RTX 4070 Ti SUPER', 8, 'tarjetas-graficas', 849.99, 15, 'memory: "16GB GDDR6X, cores: "8448 CUDA, tdp: "285W'),
('AMD Radeon RX 7800 XT', 2, 'tarjetas-graficas', 649.99, 12, 'memory: "16GB GDDR6, cores: "3840 Stream, tdp: "263W');

INSERT INTO Producto (nombre, idMarca, tipo, precio, cantidad, descripcion)
VALUES
('Corsair Vengeance DDR5 32GB 6000MHz', 9, 'memoria-ram', 189.99, 30, 'capacity: "32GB (2x16GB), speed: "6000MHz, type: "DDR5'),
('G.Skill Trident Z5 RGB 32GB 6400MHz', 10, 'memoria-ram', 219.99, 20, 'capacity: "32GB (2x16GB), speed: "6400MHz, type: "DDR5'),
('Kingston Fury Beast DDR5 64GB 5600MHz', 11, 'memoria-ram', 299.99, 15, 'capacity: "64GB (2x32GB), speed: "5600MHz, type: "DDR5'),
('Corsair Dominator Platinum RGB 64GB 6200MHz', 9, 'memoria-ram', 399.99, 10, 'capacity: "64GB (2x32GB), speed: "6200MHz, type: "DDR5');

INSERT INTO Producto (nombre, idMarca, tipo, precio, cantidad, descripcion)
VALUES
('Samsung 990 PRO 2TB NVMe', 12, 'almacenamiento', 249.99, 25, 'capacity: "2TB, type: "NVMe M.2, speed: "7450 MB/s'),
('WD Black SN850X 2TB NVMe', 13, 'almacenamiento', 229.99, 20, 'capacity: "2TB, type: "NVMe M.2, speed: "7300 MB/s'),
('Crucial P5 Plus 1TB NVMe', 14, 'almacenamiento', 129.99, 35, 'capacity: "1TB, type: "NVMe M.2, speed: "6600 MB/s'),
('Seagate FireCuda 530 4TB NVMe', 15, 'almacenamiento', 499.99, 8, 'capacity: "4TB, type: "NVMe M.2, speed: "7300 MB/s');

INSERT INTO Producto (nombre, idMarca, tipo, precio, cantidad, descripcion)
VALUES
('ASUS ROG Maximus Z790 Hero', 3, 'placas-madre', 629.99, 10, 'socket: "LGA1700, chipset: "Z790, formFactor: "ATX'),
('MSI MPG X670E Carbon WiFi', 7, 'placas-madre', 449.99, 12, 'socket: "AM5, chipset: "X670E, formFactor: "ATX'),
('Gigabyte Z790 AORUS Master', 16, 'placas-madre', 549.99, 8, 'socket: "LGA1700, chipset: "Z790, formFactor: "ATX');

INSERT INTO Producto (nombre, idMarca, tipo, precio, cantidad, descripcion)
VALUES
('Corsair RM1000x 1000W 80+ Gold', 9, 'fuentes-poder', 189.99, 15, 'wattage: "1000W, efficiency: "80+ Gold, modular: "Full Modular'),
('EVGA SuperNOVA 850W 80+ Platinum', 17, 'fuentes-poder', 169.99, 20, 'wattage: "850W, efficiency: "80+ Platinum, modular: "Full Modular'),
('Seasonic FOCUS GX-750 750W 80+ Gold', 18, 'fuentes-poder', 129.99, 25, 'wattage: "750W, efficiency: "80+ Gold, modular: "Full Modular');

INSERT INTO Producto (nombre, idMarca, tipo, precio, cantidad, descripcion)
VALUES
('NZXT H7 Flow RGB', 19, 'gabinetes', 149.99, 12, 'type: "Mid Tower, formFactor: "ATX, fans: "3x 120mm RGB'),
('Corsair 4000D Airflow', 9, 'gabinetes', 109.99, 18, 'type: "Mid Tower, formFactor: "ATX, fans: "2x 120mm'),
('Lian Li O11 Dynamic EVO', 20, 'gabinetes', 179.99, 10, 'type: "Mid Tower, formFactor: "ATX, fans: "Not included');

INSERT INTO Producto (nombre, idMarca, tipo, precio, cantidad, descripcion)
VALUES
('Corsair iCUE H150i Elite LCD XT', 9, 'refrigeracion', 299.99, 15, 'type: "Líquida AIO, size: "360mm, fans: "3x 120mm RGB'),
('NZXT Kraken Elite 360 RGB', 19, 'refrigeracion', 279.99, 12, 'type: "Líquida AIO, size: "360mm, fans: "3x 120mm RGB'),
('Noctua NH-D15 chromax.black', 21, 'refrigeracion', 109.99, 20, 'type: "Aire, size: "Dual Tower, fans: "2x 140mm'),
('Arctic Liquid Freezer II 280', 22, 'refrigeracion', 119.99, 18, 'type: "Líquida AIO, size: "280mm, fans: "2x 140mm');

INSERT INTO ImagenProducto (url, idProducto)
VALUES
('https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&h=300&fit=crop', 1),
('https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=300&fit=crop', 2),
('https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&h=300&fit=crop', 3),
('https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=300&fit=crop', 4),
('https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&h=300&fit=crop', 5);

INSERT INTO ImagenProducto (url, idProducto)
VALUES
('https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=300&fit=crop', 6),
('https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=300&fit=crop', 7),
('https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&h=300&fit=crop', 8),
('https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=300&fit=crop', 9),
('https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&h=300&fit=crop', 10);

INSERT INTO ImagenProducto (url, idProducto)
VALUES
('https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&h=300&fit=crop', 11),
('https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&h=300&fit=crop', 12),
('https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&h=300&fit=crop', 13),
('https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&h=300&fit=crop', 14);

INSERT INTO ImagenProducto (url, idProducto)
VALUES
('https://images.unsplash.com/photo-1573950940509-d924ee3fd345?w=400&h=300&fit=crop', 15),
('https://images.unsplash.com/photo-1573950940509-d924ee3fd345?w=400&h=300&fit=crop', 16),
('https://images.unsplash.com/photo-1573950940509-d924ee3fd345?w=400&h=300&fit=crop', 17),
('https://images.unsplash.com/photo-1573950940509-d924ee3fd345?w=400&h=300&fit=crop', 18);

INSERT INTO ImagenProducto (url, idProducto)
VALUES
('https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=300&fit=crop', 19),
('https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=300&fit=crop', 20),
('https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=300&fit=crop', 21);

INSERT INTO ImagenProducto (url, idProducto)
VALUES
('https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?w=400&h=300&fit=crop', 22),
('https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?w=400&h=300&fit=crop', 23),
('https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?w=400&h=300&fit=crop', 24);

INSERT INTO ImagenProducto (url, idProducto)
VALUES
('https://images.unsplash.com/photo-1587202372583-49330a15584d?w=400&h=300&fit=crop', 25),
('https://images.unsplash.com/photo-1587202372583-49330a15584d?w=400&h=300&fit=crop', 26),
('https://images.unsplash.com/photo-1587202372583-49330a15584d?w=400&h=300&fit=crop', 27);

INSERT INTO ImagenProducto (url, idProducto)
VALUES
('https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop', 28),
('https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop', 29),
('https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop', 30),
('https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop', 31);

	select * from ImagenProducto

	select p.nombre, p.descripcion, p.precio, p.cantidad, p.tipo AS categoria, m.nombre AS marca, img.urlImagen AS URL
	from Producto as p
	JOIN Marca AS m ON p.idMarca = m.idMarca
	JOIN ImagenProducto AS img ON p.idProducto = img.idProducto

	select * from Cliente