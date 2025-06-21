CREATE PROCEDURE [dbo].[spObtenerUsuarioPorUid]
    @p_USR_UID NVARCHAR(60)
AS
BEGIN
    SET NOCOUNT ON;

DECLARE @ResultadoJSON NVARCHAR(MAX);

-- Generar el JSON directamente
SELECT @ResultadoJSON = 
(
    SELECT 
        u.USR_EMAIL AS email,
        u.USR_NOMBRE AS nombre,
        u.USR_APELLIDO AS apellido,
        u.USR_DIRECCION AS direccion,
        u.USR_ROL AS rolId,
		r.ROL_NOMBRE AS rolNombre,
        u.USR_TELEFONO AS telefono,
        u.USR_ACTIVO AS activo,
		u.USR_ALTURA AS altura,
		u.USR_CIUDAD AS ciudad,
		u.USR_PROVINCIA AS provincia,
        u.USR_UID AS uid,
        -- Funciones como array JSON
        (
            SELECT f.FUN_ENDPOINT AS [funcion]
            FROM RolesFunciones rf
            INNER JOIN Funciones f ON rf.FUN_ID = f.FUN_ID
            WHERE rf.ROL_ID = u.USR_ROL
            FOR JSON PATH
        ) AS Funciones
    FROM Usuarios u
    INNER JOIN Roles r ON u.USR_ROL = r.ROL_ID
    WHERE u.USR_UID = @p_USR_UID
    FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
);

SELECT @ResultadoJSON AS Usuario;
END