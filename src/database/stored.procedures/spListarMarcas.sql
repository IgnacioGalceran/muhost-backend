CREATE PROCEDURE [dbo].[spListarMarcas]
AS
BEGIN
    SET NOCOUNT ON;

    SELECT MARCA_ID AS id, NOMBRE AS nombre
    FROM Marcas
    ORDER BY NOMBRE;
END;