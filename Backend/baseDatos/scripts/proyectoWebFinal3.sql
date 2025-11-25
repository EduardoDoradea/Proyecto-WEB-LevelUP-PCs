CREATE DATABASE DB_ProyectoWebFinal3;
GO

USE DB_ProyectoWebFinal3;
GO

-- 1. Tablas Independientes (No dependen de nadie)
CREATE TABLE Marca (
    idMarca INT PRIMARY KEY IDENTITY(1,1),
    nombre NVARCHAR(100) NOT NULL
);

CREATE TABLE Proveedor (
    idProveedor INT PRIMARY KEY IDENTITY(1,1),
    nombre NVARCHAR(100) NOT NULL,
    telefono NVARCHAR(20),
    correo NVARCHAR(100)
);

CREATE TABLE Cliente (
    idCliente INT PRIMARY KEY IDENTITY(1,1),
    correo NVARCHAR(100) NOT NULL UNIQUE, -- Unique para evitar duplicados
    nombreUsuario NVARCHAR(50) NOT NULL,
    contrasenia NVARCHAR(255) NOT NULL,   -- Hash del password
    nombre NVARCHAR(100) NOT NULL,
    telefono NVARCHAR(20)
);

-- Según tu diagrama, la tarjeta existe por sí sola y se vincula al pedido, 
-- aunque lo usual es vincularla al cliente. La dejaré como en la imagen.
CREATE TABLE TarjetaCredito (
    idTarjeta INT PRIMARY KEY IDENTITY(1,1),
    numTarjeta NVARCHAR(20) NOT NULL, -- NVARCHAR por si guardas espacios
    fechaVencimiento DATE NOT NULL,
    CCV NVARCHAR(4) NOT NULL,
    titular NVARCHAR(100) NOT NULL
);

-- 2. Tablas Dependientes (Llevan llaves foráneas)

CREATE TABLE Producto (
    idProducto INT PRIMARY KEY IDENTITY(1,1),
    nombre NVARCHAR(100) NOT NULL,
    descripcion NVARCHAR(255),
    precio DECIMAL(10, 2) NOT NULL, -- Decimal para dinero
    cantidad INT NOT NULL, -- Stock
    tipo NVARCHAR(50),
    idMarca INT,
    CONSTRAINT FK_Producto_Marca FOREIGN KEY (idMarca) REFERENCES Marca(idMarca)
);

CREATE TABLE ImagenProducto (
    idImagen INT PRIMARY KEY IDENTITY(1,1),
    url NVARCHAR(255) NOT NULL,
    idProducto INT,
    CONSTRAINT FK_Imagen_Producto FOREIGN KEY (idProducto) REFERENCES Producto(idProducto) ON DELETE CASCADE
);

CREATE TABLE ProductoXProveedor (
    idProduProve INT PRIMARY KEY IDENTITY(1,1),
    idProducto INT,
    idProveedor INT,
    CONSTRAINT FK_PxP_Producto FOREIGN KEY (idProducto) REFERENCES Producto(idProducto),
    CONSTRAINT FK_PxP_Proveedor FOREIGN KEY (idProveedor) REFERENCES Proveedor(idProveedor)
);

-- 3. Tabla Pedido (El núcleo de la compra)
CREATE TABLE Pedido (
    idPedido INT PRIMARY KEY IDENTITY(1,1),
    direccionEntrega NVARCHAR(255) NOT NULL,
    fechaPedido DATETIME DEFAULT GETDATE(),
    idCliente INT NOT NULL,
    idTarjeta INT NOT NULL, -- Aquí conectamos la tarjeta usada en este pedido específico
    CONSTRAINT FK_Pedido_Cliente FOREIGN KEY (idCliente) REFERENCES Cliente(idCliente),
    CONSTRAINT FK_Pedido_Tarjeta FOREIGN KEY (idTarjeta) REFERENCES TarjetaCredito(idTarjeta)
);

-- 4. TABLA ADICIONAL RECOMENDADA (Intermedia entre Pedido y Producto)
-- Esta tabla resuelve la línea que une Pedido con Producto en tu diagrama.
CREATE TABLE DetallePedido (
    idDetalle INT PRIMARY KEY IDENTITY(1,1),
    idPedido INT NOT NULL,
    idProducto INT NOT NULL,
    cantidad INT NOT NULL, -- Cuántos de este producto compró
    CONSTRAINT FK_Detalle_Pedido FOREIGN KEY (idPedido) REFERENCES Pedido(idPedido),
    CONSTRAINT FK_Detalle_Producto FOREIGN KEY (idProducto) REFERENCES Producto(idProducto)
);
GO