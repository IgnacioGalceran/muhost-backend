USE [master]
GO
/****** Object:  Database [muhost]    Script Date: 24/6/2025 15:36:57 ******/
CREATE DATABASE [muhost]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'muhost', FILENAME = N'E:\Programs\SQLServer2022\MSSQL16.MSSQLSERVER\MSSQL\DATA\muhost.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'muhost_log', FILENAME = N'E:\Programs\SQLServer2022\MSSQL16.MSSQLSERVER\MSSQL\DATA\muhost_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [muhost] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [muhost].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [muhost] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [muhost] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [muhost] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [muhost] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [muhost] SET ARITHABORT OFF 
GO
ALTER DATABASE [muhost] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [muhost] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [muhost] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [muhost] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [muhost] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [muhost] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [muhost] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [muhost] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [muhost] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [muhost] SET  DISABLE_BROKER 
GO
ALTER DATABASE [muhost] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [muhost] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [muhost] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [muhost] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [muhost] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [muhost] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [muhost] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [muhost] SET RECOVERY FULL 
GO
ALTER DATABASE [muhost] SET  MULTI_USER 
GO
ALTER DATABASE [muhost] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [muhost] SET DB_CHAINING OFF 
GO
ALTER DATABASE [muhost] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [muhost] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [muhost] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [muhost] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'muhost', N'ON'
GO
ALTER DATABASE [muhost] SET QUERY_STORE = ON
GO
ALTER DATABASE [muhost] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [muhost]
GO
/****** Object:  User [viandas]    Script Date: 24/6/2025 15:36:57 ******/
CREATE USER [viandas] FOR LOGIN [viandas] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  UserDefinedTableType [dbo].[tvp_DetallePago]    Script Date: 24/6/2025 15:36:57 ******/
CREATE TYPE [dbo].[tvp_DetallePago] AS TABLE(
	[DET_ESP_ID] [int] NULL,
	[DET_ESP_CANTIDAD] [int] NULL,
	[DET_ADI_ID] [int] NULL,
	[DET_ADI_CANTIDAD] [int] NULL,
	[DET_VPS_ID] [int] NULL
)
GO
/****** Object:  Table [dbo].[Adicionales]    Script Date: 24/6/2025 15:36:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Adicionales](
	[ADI_ID] [int] IDENTITY(1,1) NOT NULL,
	[ADI_TIPO] [nvarchar](max) NOT NULL,
	[ADI_PRECIO] [decimal](18, 2) NOT NULL,
	[ADI_DURACION] [int] NOT NULL,
	[ADI_TYPE] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ADI_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AdicionalesActivos]    Script Date: 24/6/2025 15:36:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AdicionalesActivos](
	[ADA_ID] [int] IDENTITY(1,1) NOT NULL,
	[ADA_USER_ID] [int] NOT NULL,
	[ADA_ADICIONAL_ID] [int] NOT NULL,
	[ADA_FECHA_INICIO] [datetimeoffset](7) NOT NULL,
	[ADA_FECHA_VENCIMIENTO] [datetimeoffset](7) NOT NULL,
	[ADA_VPS_ID] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ADA_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DetallePago]    Script Date: 24/6/2025 15:36:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DetallePago](
	[DET_ID] [int] IDENTITY(1,1) NOT NULL,
	[DET_PAGO_ID] [int] NOT NULL,
	[DET_ESP_ID] [int] NULL,
	[DET_ESP_CANTIDAD] [int] NULL,
	[DET_ADI_ID] [int] NULL,
	[DET_ADI_CANTIDAD] [int] NULL,
	[DET_VPS_ID] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[DET_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Especificaciones]    Script Date: 24/6/2025 15:36:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Especificaciones](
	[ESP_ID] [int] IDENTITY(1,1) NOT NULL,
	[ESP_TIPO] [nvarchar](100) NOT NULL,
	[ESP_CANTIDAD] [int] NOT NULL,
	[ESP_PRECIO] [decimal](18, 2) NOT NULL,
	[ESP_LIMITES] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ESP_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EspecificacionesActivas]    Script Date: 24/6/2025 15:36:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EspecificacionesActivas](
	[ESA_ID] [int] IDENTITY(1,1) NOT NULL,
	[ESA_USER_ID] [int] NOT NULL,
	[ESA_ESPECIFICACIONES_ID] [int] NOT NULL,
	[ESA_CANTIDAD] [int] NOT NULL,
	[ESA_FECHA_INICIO] [datetimeoffset](7) NOT NULL,
	[ESA_FECHA_VENCIMIENTO] [datetimeoffset](7) NOT NULL,
	[ESA_VPS_ID] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ESA_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Funciones]    Script Date: 24/6/2025 15:36:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Funciones](
	[FUN_ID] [int] IDENTITY(1,1) NOT NULL,
	[FUN_ENDPOINT] [nvarchar](50) NOT NULL,
	[FUN_METHOD] [nvarchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[FUN_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Pagos]    Script Date: 24/6/2025 15:36:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Pagos](
	[PAG_ID] [int] IDENTITY(1,1) NOT NULL,
	[PAG_MERCADOPAGO_ID] [int] NULL,
	[PAG_USER_ID] [int] NOT NULL,
	[PAG_TOTAL] [decimal](18, 2) NOT NULL,
	[PAG_FECHA] [datetime] NULL,
	[PAG_ESTADO] [nvarchar](100) NOT NULL,
	[PAG_METODO] [nvarchar](100) NULL,
	[PAG_IMAGEN_URL] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[PAG_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Planes]    Script Date: 24/6/2025 15:36:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Planes](
	[PLA_ID] [int] IDENTITY(1,1) NOT NULL,
	[PLA_TITULO] [nvarchar](max) NOT NULL,
	[PLA_DESCRIPCION] [nvarchar](max) NOT NULL,
	[PLA_CANTIDADMEMORIA] [int] NOT NULL,
	[PLA_CANTIDADDISCO] [int] NOT NULL,
	[PLA_CANTIDADCORES] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[PLA_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Roles]    Script Date: 24/6/2025 15:36:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Roles](
	[ROL_ID] [int] IDENTITY(1,1) NOT NULL,
	[ROL_NOMBRE] [nvarchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ROL_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RolesFunciones]    Script Date: 24/6/2025 15:36:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RolesFunciones](
	[ROL_ID] [int] NOT NULL,
	[FUN_ID] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ROL_ID] ASC,
	[FUN_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TiposAdicionales]    Script Date: 24/6/2025 15:36:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TiposAdicionales](
	[TAD_ID] [int] IDENTITY(1,1) NOT NULL,
	[TAD_NOMBRE] [nvarchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[TAD_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuarios]    Script Date: 24/6/2025 15:36:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuarios](
	[USR_ID] [int] IDENTITY(1,1) NOT NULL,
	[USR_UID] [nvarchar](100) NOT NULL,
	[USR_NOMBRE] [nvarchar](50) NOT NULL,
	[USR_APELLIDO] [nvarchar](50) NOT NULL,
	[USR_EMAIL] [nvarchar](100) NOT NULL,
	[USR_ROL] [int] NOT NULL,
	[USR_TELEFONO] [nvarchar](20) NULL,
	[USR_ACTIVO] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[USR_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[USR_EMAIL] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[VPS]    Script Date: 24/6/2025 15:36:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VPS](
	[VPS_ID] [int] IDENTITY(1,1) NOT NULL,
	[VPS_FECHA] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[VPS_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Adicionales] ADD  DEFAULT ((0)) FOR [ADI_TYPE]
GO
ALTER TABLE [dbo].[Especificaciones] ADD  DEFAULT ((0)) FOR [ESP_LIMITES]
GO
ALTER TABLE [dbo].[Pagos] ADD  DEFAULT (getdate()) FOR [PAG_FECHA]
GO
ALTER TABLE [dbo].[Pagos] ADD  DEFAULT ('mercadoPago') FOR [PAG_METODO]
GO
ALTER TABLE [dbo].[Usuarios] ADD  DEFAULT ((0)) FOR [USR_ACTIVO]
GO
ALTER TABLE [dbo].[VPS] ADD  DEFAULT (sysdatetime()) FOR [VPS_FECHA]
GO
ALTER TABLE [dbo].[Adicionales]  WITH CHECK ADD  CONSTRAINT [FK_Adicionales_TiposAdicionales] FOREIGN KEY([ADI_TYPE])
REFERENCES [dbo].[TiposAdicionales] ([TAD_ID])
GO
ALTER TABLE [dbo].[Adicionales] CHECK CONSTRAINT [FK_Adicionales_TiposAdicionales]
GO
ALTER TABLE [dbo].[AdicionalesActivos]  WITH CHECK ADD  CONSTRAINT [FK_Adicionales] FOREIGN KEY([ADA_ADICIONAL_ID])
REFERENCES [dbo].[Adicionales] ([ADI_ID])
GO
ALTER TABLE [dbo].[AdicionalesActivos] CHECK CONSTRAINT [FK_Adicionales]
GO
ALTER TABLE [dbo].[AdicionalesActivos]  WITH CHECK ADD  CONSTRAINT [FK_Adicionales_Usuarios] FOREIGN KEY([ADA_USER_ID])
REFERENCES [dbo].[Usuarios] ([USR_ID])
GO
ALTER TABLE [dbo].[AdicionalesActivos] CHECK CONSTRAINT [FK_Adicionales_Usuarios]
GO
ALTER TABLE [dbo].[AdicionalesActivos]  WITH CHECK ADD  CONSTRAINT [FK_AdicionalesActivos_VPS] FOREIGN KEY([ADA_VPS_ID])
REFERENCES [dbo].[VPS] ([VPS_ID])
GO
ALTER TABLE [dbo].[AdicionalesActivos] CHECK CONSTRAINT [FK_AdicionalesActivos_VPS]
GO
ALTER TABLE [dbo].[DetallePago]  WITH CHECK ADD FOREIGN KEY([DET_ADI_ID])
REFERENCES [dbo].[Adicionales] ([ADI_ID])
GO
ALTER TABLE [dbo].[DetallePago]  WITH CHECK ADD FOREIGN KEY([DET_ESP_ID])
REFERENCES [dbo].[Especificaciones] ([ESP_ID])
GO
ALTER TABLE [dbo].[DetallePago]  WITH CHECK ADD FOREIGN KEY([DET_PAGO_ID])
REFERENCES [dbo].[Pagos] ([PAG_ID])
GO
ALTER TABLE [dbo].[EspecificacionesActivas]  WITH CHECK ADD  CONSTRAINT [FK_Especificaciones] FOREIGN KEY([ESA_ESPECIFICACIONES_ID])
REFERENCES [dbo].[Especificaciones] ([ESP_ID])
GO
ALTER TABLE [dbo].[EspecificacionesActivas] CHECK CONSTRAINT [FK_Especificaciones]
GO
ALTER TABLE [dbo].[EspecificacionesActivas]  WITH CHECK ADD  CONSTRAINT [FK_Especificaciones_Usuarios] FOREIGN KEY([ESA_USER_ID])
REFERENCES [dbo].[Usuarios] ([USR_ID])
GO
ALTER TABLE [dbo].[EspecificacionesActivas] CHECK CONSTRAINT [FK_Especificaciones_Usuarios]
GO
ALTER TABLE [dbo].[EspecificacionesActivas]  WITH CHECK ADD  CONSTRAINT [FK_EspecificacionesActivas_VPS] FOREIGN KEY([ESA_VPS_ID])
REFERENCES [dbo].[VPS] ([VPS_ID])
GO
ALTER TABLE [dbo].[EspecificacionesActivas] CHECK CONSTRAINT [FK_EspecificacionesActivas_VPS]
GO
ALTER TABLE [dbo].[Pagos]  WITH CHECK ADD FOREIGN KEY([PAG_USER_ID])
REFERENCES [dbo].[Usuarios] ([USR_ID])
GO
ALTER TABLE [dbo].[RolesFunciones]  WITH CHECK ADD FOREIGN KEY([FUN_ID])
REFERENCES [dbo].[Funciones] ([FUN_ID])
GO
ALTER TABLE [dbo].[RolesFunciones]  WITH CHECK ADD FOREIGN KEY([ROL_ID])
REFERENCES [dbo].[Roles] ([ROL_ID])
GO
ALTER TABLE [dbo].[Usuarios]  WITH CHECK ADD FOREIGN KEY([USR_ROL])
REFERENCES [dbo].[Roles] ([ROL_ID])
GO
ALTER TABLE [dbo].[DetallePago]  WITH CHECK ADD  CONSTRAINT [CK_DetallePago_UnoSoloDetalle] CHECK  (([DET_ESP_ID] IS NOT NULL AND [DET_ADI_ID] IS NULL OR [DET_ESP_ID] IS NULL AND [DET_ADI_ID] IS NOT NULL))
GO
ALTER TABLE [dbo].[DetallePago] CHECK CONSTRAINT [CK_DetallePago_UnoSoloDetalle]
GO
/****** Object:  StoredProcedure [dbo].[spActualizarAdicional]    Script Date: 24/6/2025 15:36:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spActualizarAdicional]
    @ADICIONAL_ID INT,
    @TIPO         NVARCHAR(MAX),
    @PRECIO       DECIMAL(18,2),
    @DURACION     INT,
	@TIPO_ADICIONAL INT
AS
BEGIN
    SET NOCOUNT ON;
    
    UPDATE dbo.Adicionales
    SET
        ADI_TIPO     = @TIPO,
        ADI_PRECIO   = @PRECIO,
        ADI_DURACION = @DURACION,
		ADI_TYPE = @TIPO_ADICIONAL
    WHERE ADI_ID = @ADICIONAL_ID;
    
    -- Retorna el número de filas afectadas
    RETURN @@ROWCOUNT;
END;
GO
/****** Object:  StoredProcedure [dbo].[spActualizarEspecificacion]    Script Date: 24/6/2025 15:36:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spActualizarEspecificacion]
    @ESPECIFICACION_ID INT,
    @TIPO              NVARCHAR(100),
    @CANTIDAD          INT,
    @PRECIO            DECIMAL(18,2),
    @LIMITES           NVARCHAR(MAX)
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE dbo.Especificaciones
    SET
      ESP_TIPO     = @TIPO,
      ESP_CANTIDAD = @CANTIDAD,
      ESP_PRECIO   = @PRECIO,
      ESP_LIMITES  = @LIMITES
    WHERE ESP_ID = @ESPECIFICACION_ID;
    RETURN @@ROWCOUNT;
END;
GO
/****** Object:  StoredProcedure [dbo].[spActualizarPago]    Script Date: 24/6/2025 15:36:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE [dbo].[spActualizarPago]
  @PAGO_ID INT,
  @APROBADO BIT
AS
BEGIN
  SET NOCOUNT ON;

  DECLARE @ESTADO NVARCHAR(20) = CASE WHEN @APROBADO = 1 THEN 'approved' ELSE 'rejected' END;
  DECLARE @UserId INT;

  BEGIN TRY
    BEGIN TRANSACTION;

    -- Obtener user_id del pago
    SELECT @UserId = PAG_USER_ID FROM Pagos WHERE PAG_ID = @PAGO_ID;

    -- Actualizar estado del pago
    UPDATE Pagos
    SET PAG_ESTADO = @ESTADO
    WHERE PAG_ID = @PAGO_ID;

    -- Si es rechazado, revertir cantidades
    IF @APROBADO = 0
    BEGIN
      -- Para cada especificacion del detalle de pago
      -- Restar cantidad en EspecificacionesActivas o eliminar si queda 0
      DECLARE curEsp CURSOR FOR
      SELECT DET_ESP_ID, DET_ESP_CANTIDAD, DET_VPS_ID
      FROM DetallePago
      WHERE DET_PAGO_ID = @PAGO_ID
        AND DET_ESP_ID IS NOT NULL;

      DECLARE @esp_id INT;
      DECLARE @cant INT;
      DECLARE @vps_id INT;
      DECLARE @cant_actual INT;

      OPEN curEsp;
      FETCH NEXT FROM curEsp INTO @esp_id, @cant, @vps_id;

      WHILE @@FETCH_STATUS = 0
      BEGIN
        SELECT @cant_actual = ESA_CANTIDAD
        FROM EspecificacionesActivas
        WHERE ESA_USER_ID = @UserId
          AND ESA_ESPECIFICACIONES_ID = @esp_id
          AND ESA_VPS_ID = @vps_id;

        IF @cant_actual IS NOT NULL
        BEGIN
          IF (@cant_actual - @cant) <= 0
          BEGIN
            -- Eliminar registro
            DELETE FROM EspecificacionesActivas
            WHERE ESA_USER_ID = @UserId
              AND ESA_ESPECIFICACIONES_ID = @esp_id
              AND ESA_VPS_ID = @vps_id;
          END
          ELSE
          BEGIN
            -- Actualizar cantidad
            UPDATE EspecificacionesActivas
            SET ESA_CANTIDAD = ESA_CANTIDAD - @cant
            WHERE ESA_USER_ID = @UserId
              AND ESA_ESPECIFICACIONES_ID = @esp_id
              AND ESA_VPS_ID = @vps_id;
          END
        END

        FETCH NEXT FROM curEsp INTO @esp_id, @cant, @vps_id;
      END

      CLOSE curEsp;
      DEALLOCATE curEsp;

      -- Para cada adicional en detalle, eliminar registro en AdicionalesActivos
      DELETE aa
      FROM AdicionalesActivos aa
      INNER JOIN DetallePago dp ON
        aa.ADA_USER_ID = @UserId
        AND aa.ADA_ADICIONAL_ID = dp.DET_ADI_ID
        AND aa.ADA_VPS_ID = dp.DET_VPS_ID
      WHERE dp.DET_PAGO_ID = @PAGO_ID
        AND dp.DET_ADI_ID IS NOT NULL;

    END

    COMMIT TRANSACTION;
    RETURN 1; -- Éxito

  END TRY
  BEGIN CATCH
    IF XACT_STATE() <> 0
      ROLLBACK TRANSACTION;

    RETURN 0; -- Error
  END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[spActualizarPlan]    Script Date: 24/6/2025 15:36:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spActualizarPlan]
    @PLAN_ID          INT,
    @TITULO           NVARCHAR(MAX),
    @DESCRIPCION      NVARCHAR(MAX),
    @CANTIDAD_CORES   INT,
    @CANTIDAD_MEMORIA INT,
    @CANTIDAD_DISCO   INT
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE dbo.Planes
    SET
      PLA_TITULO          = @TITULO,
      PLA_DESCRIPCION     = @DESCRIPCION,
      PLA_CANTIDADCORES   = @CANTIDAD_CORES,
      PLA_CANTIDADMEMORIA = @CANTIDAD_MEMORIA,
      PLA_CANTIDADDISCO   = @CANTIDAD_DISCO
    WHERE PLA_ID = @PLAN_ID;
    RETURN @@ROWCOUNT;
END;
GO
/****** Object:  StoredProcedure [dbo].[spActualizarUsuario]    Script Date: 24/6/2025 15:36:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spActualizarUsuario]
    @p_USR_UID NVARCHAR(60),
    @p_USR_NOMBRE NVARCHAR(100),
    @p_USR_APELLIDO NVARCHAR(100),
    @p_USR_TELEFONO NVARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE Usuarios
    SET 
        USR_NOMBRE = @p_USR_NOMBRE,
        USR_APELLIDO = @p_USR_APELLIDO,
        USR_TELEFONO = @p_USR_TELEFONO
    WHERE 
        USR_UID = @p_USR_UID;

    SET NOCOUNT ON;

	DECLARE @ResultadoJSON NVARCHAR(MAX);

	-- Generar el JSON directamente
	SELECT @ResultadoJSON = 
	(
		SELECT 
			u.USR_EMAIL AS email,
			u.USR_NOMBRE AS nombre,
			u.USR_APELLIDO AS apellido,
			u.USR_ROL AS rolId,
			r.ROL_NOMBRE AS rolNombre,
			u.USR_TELEFONO AS telefono,
			u.USR_ACTIVO AS activo,
			u.USR_UID AS uid,
			-- Funciones como array JSON
			(
				SELECT f.FUN_ENDPOINT AS [funcion], f.FUN_METHOD AS [method]
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
GO
/****** Object:  StoredProcedure [dbo].[spCrearAdicional]    Script Date: 24/6/2025 15:36:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spCrearAdicional]
    @TIPO      NVARCHAR(MAX),
    @PRECIO    DECIMAL(18,2),
    @DURACION  INT,
	@TIPO_ADICIONAL INT
AS
BEGIN
    SET NOCOUNT ON;
    
    INSERT INTO dbo.Adicionales (ADI_TIPO, ADI_PRECIO, ADI_DURACION, ADI_TYPE)
    VALUES (@TIPO, @PRECIO, @DURACION, @TIPO_ADICIONAL);
    
    -- Retorna el nuevo ID (o valor > 0 para indicar éxito)
    RETURN CAST(SCOPE_IDENTITY() AS INT);
END;
GO
/****** Object:  StoredProcedure [dbo].[spCrearEspecificacion]    Script Date: 24/6/2025 15:36:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spCrearEspecificacion]
    @TIPO     NVARCHAR(100),
    @CANTIDAD INT,
    @PRECIO   DECIMAL(18,2),
    @LIMITES  NVARCHAR(MAX)
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO dbo.Especificaciones
      (ESP_TIPO, ESP_CANTIDAD, ESP_PRECIO, ESP_LIMITES)
    VALUES
      (@TIPO, @CANTIDAD, @PRECIO, @LIMITES);
    RETURN CAST(SCOPE_IDENTITY() AS INT);
END;
GO
/****** Object:  StoredProcedure [dbo].[spCrearPago]    Script Date: 24/6/2025 15:36:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[spCrearPago]
  @MercadoPagoId NVARCHAR(100) = null,
  @Uid           NVARCHAR(100),
  @MetodoPago    NVARCHAR(50) = 'mercadopago',
  @Estado        NVARCHAR(50),
  @Total         DECIMAL(18,2),
  @Imagen_url	 NVARCHAR(MAX),
  @Items         dbo.tvp_DetallePago READONLY
AS
BEGIN
  SET NOCOUNT ON;
  SET XACT_ABORT ON;

  DECLARE @NewPagoId INT;
  DECLARE @Now DATETIMEOFFSET = SYSDATETIMEOFFSET();
  DECLARE @User_id INT;
  DECLARE @VpsId INT;

  BEGIN TRY
    BEGIN TRANSACTION;

    -- Obtener el usuario
    SELECT @User_id = USR_ID FROM Usuarios WHERE USR_UID = @Uid;

    IF @User_id IS NULL
    BEGIN
      RAISERROR('Usuario no encontrado.', 16, 1);
      RETURN -1;
    END

    -- Verificar que todos los ítems traen el mismo DET_VPS_ID
    SELECT TOP 1 @VpsId = DET_VPS_ID FROM @Items;

    IF EXISTS (
      SELECT 1 FROM (
        SELECT DISTINCT DET_VPS_ID FROM @Items
      ) AS Distintos
      WHERE DET_VPS_ID <> @VpsId
    )
    BEGIN
      RAISERROR('Todos los ítems deben tener el mismo DET_VPS_ID.', 16, 1);
      RETURN -1;
    END

    -- Si DET_VPS_ID es 0, se está creando un VPS nuevo
    IF @VpsId = 0
	BEGIN
	  INSERT INTO VPS DEFAULT VALUES;
	  SET @VpsId = SCOPE_IDENTITY();

	  INSERT INTO EspecificacionesActivas (
		ESA_USER_ID, ESA_ESPECIFICACIONES_ID, ESA_CANTIDAD, ESA_FECHA_INICIO, ESA_FECHA_VENCIMIENTO, ESA_VPS_ID
	  )
	  SELECT
		@User_id,
		it.DET_ESP_ID,
		it.DET_ESP_CANTIDAD,
		@Now,
		DATEADD(DAY, 30, @Now),
		@VpsId
	  FROM @Items it
	  WHERE it.DET_ESP_ID IS NOT NULL;

	  INSERT INTO AdicionalesActivos (
		ADA_USER_ID, ADA_ADICIONAL_ID, ADA_FECHA_INICIO, ADA_FECHA_VENCIMIENTO, ADA_VPS_ID
	  )
	  SELECT
		@User_id,
		it.DET_ADI_ID,
		@Now,
		CASE
		  WHEN ad.ADI_DURACION = 0 THEN '9999-12-31'
		  ELSE DATEADD(DAY, ad.ADI_DURACION, @Now)
		END,
		@VpsId
	  FROM @Items it
	  JOIN Adicionales ad ON ad.ADI_ID = it.DET_ADI_ID
	  WHERE it.DET_ADI_ID IS NOT NULL;
	END
	ELSE
	BEGIN
	 ---------------------------------------------------------------------
    -- 1) Actualizar EspecificacionesActivas existentes
    ---------------------------------------------------------------------
		UPDATE ea
		SET ea.ESA_CANTIDAD = ea.ESA_CANTIDAD + it.DET_ESP_CANTIDAD
		FROM EspecificacionesActivas ea
		JOIN @Items it
		  ON ea.ESA_ESPECIFICACIONES_ID = it.DET_ESP_ID
		WHERE ea.ESA_USER_ID = @User_id
		  AND @Now <= ea.ESA_FECHA_VENCIMIENTO
		  AND it.DET_ESP_ID IS NOT NULL;

		-- 2a) Borrar adicionales de tipos coincidentes
		;WITH ItemExtras AS (
		  SELECT DISTINCT
			ad.ADI_ID,
			ad.ADI_TYPE
		  FROM @Items it
		  JOIN Adicionales ad ON ad.ADI_ID = it.DET_ADI_ID
		  WHERE it.DET_ADI_ID IS NOT NULL
		)
		DELETE aa
		FROM AdicionalesActivos aa
		JOIN Adicionales ad2    ON ad2.ADI_ID = aa.ADA_ADICIONAL_ID
		JOIN ItemExtras ie      ON ad2.ADI_TYPE = ie.ADI_TYPE
		WHERE aa.ADA_USER_ID = @User_id
		  AND @Now <= aa.ADA_FECHA_VENCIMIENTO;

		-- 2b) Insertar los nuevos adicionales
		INSERT INTO AdicionalesActivos (
		  ADA_USER_ID,
		  ADA_ADICIONAL_ID,
		  ADA_FECHA_INICIO,
		  ADA_FECHA_VENCIMIENTO,
		  ADA_VPS_ID
		)
		SELECT
		  @User_id,
		  it.DET_ADI_ID,
		  @Now,
		  CASE
			WHEN ad.ADI_DURACION = 0 THEN '9999-12-31'
			ELSE DATEADD(DAY, ad.ADI_DURACION, @Now)
		  END,
		  @VpsId
		FROM @Items it
		JOIN Adicionales ad 
		  ON ad.ADI_ID = it.DET_ADI_ID
		WHERE it.DET_ADI_ID IS NOT NULL;
	END

    -- Insertar cabecera del pago
    INSERT INTO Pagos (
      PAG_MERCADOPAGO_ID, PAG_USER_ID, PAG_TOTAL, PAG_FECHA, PAG_ESTADO, PAG_IMAGEN_URL, PAG_METODO
    )
    VALUES (
      @MercadoPagoId, @User_id, @Total, @Now, @Estado, @Imagen_url, @MetodoPago
    );

    SET @NewPagoId = SCOPE_IDENTITY();

    -- Insertar detalle de ítems
    INSERT INTO DetallePago(
      DET_PAGO_ID,
      DET_ESP_ID,
      DET_ESP_CANTIDAD,
      DET_ADI_ID,
      DET_ADI_CANTIDAD,
      DET_VPS_ID
    )
    SELECT
      @NewPagoId,
      DET_ESP_ID,
      DET_ESP_CANTIDAD,
      DET_ADI_ID,
      DET_ADI_CANTIDAD,
      @VpsId
    FROM @Items;

    ---------------------------------------------------------------------
    COMMIT TRANSACTION;
    RETURN 1;

  END TRY
  BEGIN CATCH
    IF XACT_STATE() <> 0
      ROLLBACK TRANSACTION;

    DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
    DECLARE @ErrorSeverity INT = ERROR_SEVERITY();
    DECLARE @ErrorState INT = ERROR_STATE();
    RAISERROR (@ErrorMessage, @ErrorSeverity, @ErrorState);

    RETURN -1;
  END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[spCrearPlan]    Script Date: 24/6/2025 15:36:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spCrearPlan]
    @TITULO          NVARCHAR(MAX),
    @DESCRIPCION     NVARCHAR(MAX),
    @CANTIDAD_CORES  INT,
    @CANTIDAD_MEMORIA INT,
    @CANTIDAD_DISCO  INT
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO dbo.Planes
      (PLA_TITULO, PLA_DESCRIPCION, PLA_CANTIDADCORES, PLA_CANTIDADMEMORIA, PLA_CANTIDADDISCO)
    VALUES
      (@TITULO, @DESCRIPCION, @CANTIDAD_CORES, @CANTIDAD_MEMORIA, @CANTIDAD_DISCO);
    RETURN CAST(SCOPE_IDENTITY() AS INT);
END;
GO
/****** Object:  StoredProcedure [dbo].[spCrearUsuario]    Script Date: 24/6/2025 15:36:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spCrearUsuario]
    @p_USR_NOMBRE   NVARCHAR(50),
    @p_USR_APELLIDO NVARCHAR(50),
    @p_USR_EMAIL    NVARCHAR(100),
    @p_USR_UID      NVARCHAR(100),
    @p_USR_TELEFONO NVARCHAR(20)
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO dbo.Usuarios
        (USR_NOMBRE, USR_APELLIDO, USR_EMAIL, USR_UID, USR_TELEFONO, USR_ROL, USR_ACTIVO)
    VALUES
        (@p_USR_NOMBRE, @p_USR_APELLIDO, @p_USR_EMAIL, @p_USR_UID, @p_USR_TELEFONO,
         /* rol por defecto = */ 2,
         /* activo por defecto = */ 0);

    RETURN CAST(SCOPE_IDENTITY() AS INT);
END;
GO
/****** Object:  StoredProcedure [dbo].[spCrearUsuarioGoogle]    Script Date: 24/6/2025 15:36:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spCrearUsuarioGoogle]
    @p_USR_NOMBRE   NVARCHAR(50),
    @p_USR_APELLIDO NVARCHAR(50),
    @p_USR_EMAIL    NVARCHAR(100),
    @p_USR_UID      NVARCHAR(100),
    @p_USR_TELEFONO NVARCHAR(20)
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO dbo.Usuarios
        (USR_NOMBRE, USR_APELLIDO, USR_EMAIL, USR_UID, USR_TELEFONO, USR_ROL, USR_ACTIVO)
    VALUES
        (@p_USR_NOMBRE, @p_USR_APELLIDO, @p_USR_EMAIL, @p_USR_UID, @p_USR_TELEFONO,
         /* rol cliente = */ 2,
         /* activo = */ 1);

    RETURN CAST(SCOPE_IDENTITY() AS INT);
END;
GO
/****** Object:  StoredProcedure [dbo].[spEliminarAdicional]    Script Date: 24/6/2025 15:36:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spEliminarAdicional]
    @ADICIONAL_ID INT
AS
BEGIN
    SET NOCOUNT ON;
    
    DELETE FROM dbo.Adicionales
    WHERE ADI_ID = @ADICIONAL_ID;
    
    -- Retorna el número de filas afectadas
    RETURN @@ROWCOUNT;
END;
GO
/****** Object:  StoredProcedure [dbo].[spEliminarEspecificacion]    Script Date: 24/6/2025 15:36:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spEliminarEspecificacion]
    @ESPECIFICACION_ID INT
AS
BEGIN
    SET NOCOUNT ON;
    DELETE FROM dbo.Especificaciones
    WHERE ESP_ID = @ESPECIFICACION_ID;
    RETURN @@ROWCOUNT;
END;
GO
/****** Object:  StoredProcedure [dbo].[spEliminarPlan]    Script Date: 24/6/2025 15:36:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spEliminarPlan]
    @PLAN_ID INT
AS
BEGIN
    SET NOCOUNT ON;
    DELETE FROM dbo.Planes
    WHERE PLA_ID = @PLAN_ID;
    RETURN @@ROWCOUNT;
END;
GO
/****** Object:  StoredProcedure [dbo].[spEliminarUsuario]    Script Date: 24/6/2025 15:36:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spEliminarUsuario]
    @p_USR_ID INT
AS
BEGIN
    SET NOCOUNT ON;
    DELETE FROM dbo.Usuarios
    WHERE USR_ID = @p_USR_ID;

    RETURN @@ROWCOUNT;
END;
GO
/****** Object:  StoredProcedure [dbo].[spListarAdicionales]    Script Date: 24/6/2025 15:36:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spListarAdicionales]
AS
BEGIN
    SET NOCOUNT ON;
    SELECT
        ADI_ID AS id,
        ADI_TIPO AS tipo,
        ADI_PRECIO AS precio,
        ADI_DURACION AS duracion,
		ADI_TYPE AS tipo_adicional
    FROM dbo.Adicionales
	ORDER BY ADI_TYPE, ADI_PRECIO DESC;
END;
GO
/****** Object:  StoredProcedure [dbo].[spListarEspecificaciones]    Script Date: 24/6/2025 15:36:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spListarEspecificaciones]
AS
BEGIN
    SET NOCOUNT ON;
    SELECT
        ESP_ID AS id,
        ESP_TIPO AS tipo,
        ESP_CANTIDAD AS cantidad,
        ESP_PRECIO AS precio,
        ESP_LIMITES AS limites,
		ROUND(ESP_PRECIO * 1.0 / ESP_CANTIDAD, 2) AS precio_unitario
    FROM dbo.Especificaciones;
END;
GO
/****** Object:  StoredProcedure [dbo].[spListarPlan]    Script Date: 24/6/2025 15:36:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spListarPlan]
    @PLAN_ID INT
AS
BEGIN
    SET NOCOUNT ON;
    SELECT
        PLA_ID AS id,
        PLA_TITULO AS titulo,
        PLA_DESCRIPCION AS descripcion,
        PLA_CANTIDADCORES   AS cantidad_cores,
        PLA_CANTIDADMEMORIA AS cantidad_memoria,
        PLA_CANTIDADDISCO   AS cantidad_disco
    FROM dbo.Planes
    WHERE PLA_ID = @PLAN_ID;
END;
GO
/****** Object:  StoredProcedure [dbo].[spListarPlanes]    Script Date: 24/6/2025 15:36:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spListarPlanes]
AS
BEGIN
    SET NOCOUNT ON;
    SELECT
        PLA_ID AS id,
        PLA_TITULO AS titulo,
        PLA_DESCRIPCION AS descripcion,
        PLA_CANTIDADCORES   AS cantidad_cores,
        PLA_CANTIDADMEMORIA AS cantidad_memoria,
        PLA_CANTIDADDISCO   AS cantidad_disco
    FROM dbo.Planes;
END;
GO
/****** Object:  StoredProcedure [dbo].[spListarTiposAdicionales]    Script Date: 24/6/2025 15:36:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spListarTiposAdicionales]
AS
BEGIN
    SET NOCOUNT ON;
    SELECT
		TAD_ID AS id,
		TAD_NOMBRE AS nombre
    FROM dbo.TiposAdicionales
END;
GO
/****** Object:  StoredProcedure [dbo].[spListarUsuarios]    Script Date: 24/6/2025 15:36:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spListarUsuarios]
AS
BEGIN
    SET NOCOUNT ON;
    SELECT
        USR_ID AS id,
        USR_UID AS uid,
        USR_NOMBRE AS nombre,
        USR_APELLIDO as apellido,
        USR_EMAIL AS email,
        USR_ROL AS rol,
        USR_TELEFONO AS telefono,
        USR_ACTIVO AS activo
    FROM dbo.Usuarios;
END;
GO
/****** Object:  StoredProcedure [dbo].[spObtenerEspecificacion]    Script Date: 24/6/2025 15:36:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spObtenerEspecificacion]
    @p_ESP_ID INT
AS
BEGIN
    SET NOCOUNT ON;
    SELECT
        ESP_ID AS id,
        ESP_TIPO AS tipo,
        ESP_CANTIDAD AS cantidad,
        ESP_PRECIO AS precio,
        ESP_LIMITES AS limites
    FROM dbo.Especificaciones
    WHERE ESP_ID = @p_ESP_ID;
END;
GO
/****** Object:  StoredProcedure [dbo].[spObtenerLicenciasActuales]    Script Date: 24/6/2025 15:36:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spObtenerLicenciasActuales]
    @UsuarioUid NVARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @UserId INT;

    SELECT @UserId = USR_ID
    FROM Usuarios
    WHERE USR_UID = @UsuarioUid;

    IF @UserId IS NULL
    BEGIN
        RAISERROR('Usuario no encontrado.', 16, 1);
        RETURN;
    END

    SELECT
        v.VPS_ID AS vps_id,
        v.VPS_FECHA AS fecha_creacion,
        (
            SELECT *
            FROM (
                SELECT
                    ea.ESA_ESPECIFICACIONES_ID AS id,
                    'Especificación' AS tipo,
                    esp.ESP_TIPO AS descripcion,
                    ea.ESA_CANTIDAD AS cantidad,
                    ea.ESA_FECHA_INICIO AS fecha_compra,
                    ea.ESA_FECHA_VENCIMIENTO AS fecha_vencimiento,
                    esp.ESP_PRECIO AS precio,
					ROUND(esp.ESP_PRECIO * 1.0 / esp.ESP_CANTIDAD, 2) as precio_unitario,
                    esp.ESP_LIMITES AS limites,
                    'approved' AS estado
                FROM EspecificacionesActivas ea
                JOIN Especificaciones esp ON esp.ESP_ID = ea.ESA_ESPECIFICACIONES_ID
                WHERE ea.ESA_USER_ID = @UserId
                  AND ea.ESA_VPS_ID = v.VPS_ID
                  AND GETDATE() <= ea.ESA_FECHA_VENCIMIENTO

                UNION ALL

                SELECT
                    aa.ADA_ADICIONAL_ID AS id,
                    'Adicional' AS tipo,
                    ad.ADI_TIPO AS descripcion,
                    1 AS cantidad,
                    aa.ADA_FECHA_INICIO AS fecha_compra,
                    CASE
                        WHEN ad.ADI_DURACION = 0 THEN NULL
                        ELSE aa.ADA_FECHA_VENCIMIENTO
                    END AS fecha_vencimiento,
                    ad.ADI_PRECIO AS precio,
                    NULL AS limites,
					ad.ADI_PRECIO as precio_unitario,
                    'approved' AS estado
                FROM AdicionalesActivos aa
                JOIN Adicionales ad ON ad.ADI_ID = aa.ADA_ADICIONAL_ID
                WHERE aa.ADA_USER_ID = @UserId
                  AND aa.ADA_VPS_ID = v.VPS_ID
                  AND (ad.ADI_DURACION = 0 OR GETDATE() <= aa.ADA_FECHA_VENCIMIENTO)
            ) AS licenciasPorVps
            FOR JSON PATH
        ) AS licencias
    FROM VPS v
    WHERE EXISTS (
        SELECT 1 FROM EspecificacionesActivas ea
        WHERE ea.ESA_USER_ID = @UserId AND ea.ESA_VPS_ID = v.VPS_ID
              AND GETDATE() <= ea.ESA_FECHA_VENCIMIENTO
        UNION
        SELECT 1 FROM AdicionalesActivos aa
        WHERE aa.ADA_USER_ID = @UserId AND aa.ADA_VPS_ID = v.VPS_ID
              AND (GETDATE() <= aa.ADA_FECHA_VENCIMIENTO OR EXISTS (
                  SELECT 1 FROM Adicionales ad
                  WHERE ad.ADI_ID = aa.ADA_ADICIONAL_ID AND ad.ADI_DURACION = 0
              ))
    )
    FOR JSON PATH
END
GO
/****** Object:  StoredProcedure [dbo].[spObtenerPagosPendientesJson]    Script Date: 24/6/2025 15:36:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spObtenerPagosPendientesJson]
AS
BEGIN
  SET NOCOUNT ON;

  SELECT (
    SELECT
      p.PAG_ID AS pago_id,
      p.PAG_MERCADOPAGO_ID AS mercado_pago_id,
      p.PAG_USER_ID AS user_id,
      p.PAG_TOTAL AS total,
      p.PAG_FECHA AS fecha,
      p.PAG_ESTADO AS estado,
      p.PAG_METODO AS metodo,
      p.PAG_IMAGEN_URL AS imagen_url,
      (
        SELECT
          dp.DET_ESP_ID AS especificacion_id,
          dp.DET_ESP_CANTIDAD AS especificacion_cantidad,
          dp.DET_ADI_ID AS adicional_id,
          dp.DET_ADI_CANTIDAD AS adicional_cantidad,
          dp.DET_VPS_ID AS vps_id,
		  a.ADI_TIPO AS adicional_nombre,
		  e.ESP_TIPO AS especificacion_nombre
        FROM DetallePago dp
		LEFT JOIN Especificaciones e ON dp.DET_ESP_ID = e.ESP_ID
		LEFT JOIN Adicionales a ON dp.DET_ADI_ID = a.ADI_ID
        WHERE dp.DET_PAGO_ID = p.PAG_ID
        FOR JSON PATH
      ) AS items

    FROM Pagos p
    ORDER BY p.PAG_FECHA DESC
    FOR JSON PATH
  ) AS pagos
END
GO
/****** Object:  StoredProcedure [dbo].[spObtenerTodasLasLicenciasActuales]    Script Date: 24/6/2025 15:36:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spObtenerTodasLasLicenciasActuales]
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        v.VPS_ID AS vps_id,
        v.VPS_FECHA AS fecha_creacion,
        u.USR_ID AS user_id,
        u.USR_UID AS user_uid,
        u.USR_NOMBRE AS user_nombre,
        u.USR_APELLIDO AS user_apellido,
        u.USR_EMAIL AS user_email,
        u.USR_TELEFONO AS user_telefono,
        (
            SELECT *
            FROM (
                SELECT
                    ea.ESA_ESPECIFICACIONES_ID AS id,
                    'Especificación' AS tipo,
                    esp.ESP_TIPO AS descripcion,
                    ea.ESA_CANTIDAD AS cantidad,
                    ea.ESA_FECHA_INICIO AS fecha_compra,
                    ea.ESA_FECHA_VENCIMIENTO AS fecha_vencimiento,
                    esp.ESP_PRECIO AS precio,
					ROUND(esp.ESP_PRECIO * 1.0 / esp.ESP_CANTIDAD, 2) as precio_unitario,
                    esp.ESP_LIMITES AS limites,
                    'approved' AS estado
                FROM EspecificacionesActivas ea
                JOIN Especificaciones esp ON esp.ESP_ID = ea.ESA_ESPECIFICACIONES_ID
                WHERE ea.ESA_VPS_ID = v.VPS_ID
                  AND GETDATE() <= ea.ESA_FECHA_VENCIMIENTO

                UNION ALL

                SELECT
                    aa.ADA_ADICIONAL_ID AS id,
                    'Adicional' AS tipo,
                    ad.ADI_TIPO AS descripcion,
                    1 AS cantidad,
                    aa.ADA_FECHA_INICIO AS fecha_compra,
                    CASE
                        WHEN ad.ADI_DURACION = 0 THEN NULL
                        ELSE aa.ADA_FECHA_VENCIMIENTO
                    END AS fecha_vencimiento,
                    ad.ADI_PRECIO AS precio,
					ad.ADI_PRECIO AS precio_unitario,
                    NULL AS limites,
                    'approved' AS estado
                FROM AdicionalesActivos aa
                JOIN Adicionales ad ON ad.ADI_ID = aa.ADA_ADICIONAL_ID
                WHERE aa.ADA_VPS_ID = v.VPS_ID
                  AND (ad.ADI_DURACION = 0 OR GETDATE() <= aa.ADA_FECHA_VENCIMIENTO)
            ) AS licenciasPorVps
            FOR JSON PATH
        ) AS licencias
    FROM VPS v
    LEFT JOIN EspecificacionesActivas ea ON ea.ESA_VPS_ID = v.VPS_ID
    LEFT JOIN AdicionalesActivos aa ON aa.ADA_VPS_ID = v.VPS_ID
    LEFT JOIN Usuarios u ON u.USR_ID = ISNULL(ea.ESA_USER_ID, aa.ADA_USER_ID)
    WHERE EXISTS (
        SELECT 1 FROM EspecificacionesActivas ea2
        WHERE ea2.ESA_VPS_ID = v.VPS_ID AND GETDATE() <= ea2.ESA_FECHA_VENCIMIENTO
        UNION
        SELECT 1 FROM AdicionalesActivos aa2
        WHERE aa2.ADA_VPS_ID = v.VPS_ID
          AND (GETDATE() <= aa2.ADA_FECHA_VENCIMIENTO
               OR EXISTS (SELECT 1 FROM Adicionales ad2 WHERE ad2.ADI_ID = aa2.ADA_ADICIONAL_ID AND ad2.ADI_DURACION = 0))
    )
    GROUP BY
        v.VPS_ID,
        v.VPS_FECHA,
        u.USR_ID,
        u.USR_UID,
        u.USR_NOMBRE,
        u.USR_APELLIDO,
        u.USR_EMAIL,
        u.USR_TELEFONO
    FOR JSON PATH
END
GO
/****** Object:  StoredProcedure [dbo].[spObtenerUsuario]    Script Date: 24/6/2025 15:36:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spObtenerUsuario]
    @p_USR_ID INT
AS
BEGIN
    SET NOCOUNT ON;
    SELECT
        USR_ID AS id,
        USR_UID AS uid,
        USR_NOMBRE AS nombre,
        USR_APELLIDO as apellido,
        USR_EMAIL AS email,
        USR_ROL AS rol,
        USR_TELEFONO AS telefono,
        USR_ACTIVO AS activo
    FROM dbo.Usuarios
    WHERE USR_ID = @p_USR_ID;
END;
GO
/****** Object:  StoredProcedure [dbo].[spObtenerUsuarioPorUid]    Script Date: 24/6/2025 15:36:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
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
        u.USR_ROL AS rolId,
		r.ROL_NOMBRE AS rolNombre,
        u.USR_TELEFONO AS telefono,
        u.USR_ACTIVO AS activo,
        u.USR_UID AS uid,
        -- Funciones como array JSON
        (
            SELECT f.FUN_ENDPOINT AS [funcion], f.FUN_METHOD AS [method]
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
GO
USE [master]
GO
ALTER DATABASE [muhost] SET  READ_WRITE 
GO
