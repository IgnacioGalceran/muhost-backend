CREATE PROCEDURE [dbo].[spCrearMarca]
    @NOMBRE NVARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        INSERT INTO Marcas (NOMBRE)
        VALUES (@NOMBRE);

        IF @@ROWCOUNT > 0
            RETURN 1;
        ELSE
            RETURN 1;
    END TRY
    BEGIN CATCH
        RETURN 0;
    END CATCH
END;