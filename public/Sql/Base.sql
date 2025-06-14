CREATE TABLE detalles_venta (
    id_detalle INT AUTO_INCREMENT PRIMARY KEY,
    id_ventas INT,
    id_producto INT,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_ventas) REFERENCES Ventas(id_ventas),
    FOREIGN KEY (id_producto) REFERENCES Productos(id_producto)
);
