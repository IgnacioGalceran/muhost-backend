CREATE PROCEDURE [dbo].[spCrearParte]
    @NOMBRE NVARCHAR(100),
    @DESCRIPCION NVARCHAR(255),
    @PRECIO DECIMAL(18,2),
    @STOCK INT,
    @AUTO_ID NVARCHAR(MAX)
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        -- Insertar la parte
        INSERT INTO Partes (NOMBRE, DESCRIPCION, PRECIO, STOCK, AUTO_ID)
        VALUES (@NOMBRE, @DESCRIPCION, @PRECIO, @STOCK, @AUTO_ID);

        IF @@ROWCOUNT > 0
            RETURN 1;
        ELSE
            RETURN 0;
    END TRY
    BEGIN CATCH
        RETURN 0;
    END CATCH
END;