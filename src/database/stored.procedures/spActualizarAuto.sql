PROCEDURE [dbo].[spActualizarAuto]
    @AUTO_ID INT,
    @MARCA_ID INT,
    @MODELO NVARCHAR(100),
    @ANIO INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        UPDATE Autos
        SET 
            MARCA_ID = @MARCA_ID,
            MODELO = @MODELO,
            ANIO = @ANIO
        WHERE AUTO_ID = @AUTO_ID;

       IF @@ROWCOUNT > 0
            RETURN 1;
        ELSE
            RETURN 1;
    END TRY
    BEGIN CATCH
        RETURN 0;
    END CATCH
END;
