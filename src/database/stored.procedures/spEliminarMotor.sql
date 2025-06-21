CREATE PROCEDURE [dbo].[spEliminarMotor]
    @MOTOR_ID INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        DELETE FROM Motores
        WHERE MOTOR_ID = @MOTOR_ID;

        IF @@ROWCOUNT > 0
            RETURN 1;  -- Eliminado correctamente
        ELSE
            RETURN 0;
    END TRY
    BEGIN CATCH
        RETURN 0;  -- Hubo un error
    END CATCH
END;