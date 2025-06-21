CREATE PROCEDURE [dbo].[spActualizarMarca]
    @MARCA_ID INT,
    @NOMBRE NVARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        UPDATE Marcas
        SET NOMBRE = @NOMBRE
        WHERE MARCA_ID = @MARCA_ID;

        IF @@ROWCOUNT > 0
            RETURN 1;
        ELSE
            RETURN 1;
    END TRY
    BEGIN CATCH
        RETURN 1;
    END CATCH
END;