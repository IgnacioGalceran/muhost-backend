CREATE PROCEDURE [dbo].[spEliminarParte]
    @PARTE_ID INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        -- Luego eliminar la Parte
        DELETE FROM Partes
        WHERE PARTE_ID = @PARTE_ID;

        IF @@ROWCOUNT > 0
            RETURN 1;  -- Eliminado correctamente
        ELSE
            RETURN 0;
    END TRY
    BEGIN CATCH
        RETURN 0;  -- Hubo un error
    END CATCH
END;