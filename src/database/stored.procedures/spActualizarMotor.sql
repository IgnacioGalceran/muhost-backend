CREATE PROCEDURE [dbo].[spActualizarMotor]
    @MOTOR_ID INT,
    @NOMBRE NVARCHAR(100),
    @DESCRIPCION NVARCHAR(255),
    @PRECIO DECIMAL(18,2),
    @STOCK INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        -- Actualizar los datos de la parte
        UPDATE Motores
        SET NOMBRE = @NOMBRE,
            DESCRIPCION = @DESCRIPCION,
            PRECIO = @PRECIO,
            STOCK = @STOCK
        WHERE MOTOR_ID = @MOTOR_ID;

        COMMIT TRANSACTION;
        RETURN 1;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        RETURN 0;
    END CATCH
END;