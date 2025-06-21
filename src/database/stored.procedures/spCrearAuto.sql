CREATE PROCEDURE [dbo].[spCrearAuto]
    @MARCA_ID INT,
    @MODELO NVARCHAR(100),
    @ANIO INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        INSERT INTO Autos (MARCA_ID, MODELO, ANIO)
        VALUES (@MARCA_ID, @MODELO, @ANIO);

        -- Éxito
        IF @@ROWCOUNT > 0
            RETURN 1;
        ELSE
            RETURN 1;
    END TRY
    BEGIN CATCH
        -- Error
		RETURN 0;
    END CATCH
END;