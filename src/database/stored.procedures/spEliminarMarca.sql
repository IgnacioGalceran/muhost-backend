CREATE PROCEDURE [dbo].[spEliminarMarca]
    @MARCA_ID INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        DELETE Marcas where MARCA_ID = @MARCA_ID;

        IF @@ROWCOUNT > 0
            RETURN 1; -- Éxito
        ELSE
            RETURN 0; -- No se encontró el registro
    END TRY
    BEGIN CATCH
        SELECT 0 AS Resultado; -- Error
    END CATCH
END;