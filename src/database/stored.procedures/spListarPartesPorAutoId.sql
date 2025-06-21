CREATE PROCEDURE [dbo].[spListarPartesPorAutoId]
    @AUTO_ID INT
AS
BEGIN
    SET NOCOUNT ON;

    -- Devolver info del auto
    SELECT 
        a.AUTO_ID AS id,
        a.MARCA_ID AS marcaId,
        a.MODELO AS modelo,
        a.ANIO AS anio
    FROM Autos a
    WHERE a.AUTO_ID = @AUTO_ID;

    -- Devolver partes asociadas
    SELECT 
        PARTE_ID AS id,
        NOMBRE AS nombre,
        DESCRIPCION AS descripcion,
        PRECIO AS precio,
        STOCK AS stock,
		AUTO_ID AS autoId
    FROM Partes
    WHERE AUTO_ID = @AUTO_ID;
END;