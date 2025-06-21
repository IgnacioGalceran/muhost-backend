CREATE PROCEDURE [dbo].[spListarAutos]
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        AUTO_ID AS id,
        MARCA_ID AS marcaId,
        MODELO AS modelo,
        ANIO AS anio
    FROM Autos;
END;