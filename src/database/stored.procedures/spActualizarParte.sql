CREATE PROCEDURE [dbo].[spActualizarParte]
    @PARTE_ID INT,
    @NOMBRE NVARCHAR(100),
    @DESCRIPCION NVARCHAR(255),
    @PRECIO DECIMAL(18,2),
    @STOCK INT,
    @AUTO_ID INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        -- Actualizar los datos de la parte
        UPDATE Partes
        SET NOMBRE = @NOMBRE,
            DESCRIPCION = @DESCRIPCION,
            PRECIO = @PRECIO,
            STOCK = @STOCK,
			AUTO_ID = @AUTO_ID
        WHERE PARTE_ID = @PARTE_ID;

        COMMIT TRANSACTION;
        RETURN 1;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        RETURN 0;
    END CATCH
END;