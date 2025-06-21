CREATE PROCEDURE [dbo].[spListarMotores]
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        MOTOR_ID AS id,
        NOMBRE AS nombre,
        DESCRIPCION AS descripcion,
        PRECIO AS precio,
		STOCK AS stock
    FROM Motores;
END;