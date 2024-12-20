- Opciones de entrada para el procesado de los datos:
	- Establecer una agrupación de datos (de momento 15 minutos)
	- Rellenar los huecos, según la agrupación
	- Eliminar los registros incorrectos (por ejemplo, valor unavailable)
	- Valor por defecto para valores incorrectos o en huecos (por ejemplo, 0)
	
- Algoritmo:
	- Abrir un fichero csv, columnas:
		1) Nombre del dispositivo
		2) Potencia
		3) Fecha de registro
	- Procesar cada registro y marcar si el valor es incorrecto y/o si la fecha es incorrecta
		- El valor tiene que ser un valor int/double/float correcto.
		- La fecha tiene que estar en formato ISO
	- Si la configuración lo requiere:
		- Eliminar registros incorrectos
		- Cambiar los valores no numéricos por un valor por defecto
	- Ordenar las fechas de más antigua a más nueva
	- Ajustar los registros "raw" con la agrupación:
		- Si no hay valores en una agrupación, establecer el valor por defecto de la configuración
		- Si ha un valor en la agrupación, el valor será ese
		- Si hay n-valores en la agrupación, el valor de la agrupación será el promedio de esos valores
		- Establecer la fecha del registro según la agrupación:
			- Establecer la fecha en formato ISO.
			- La fecha tiene que empezar
	- Escribir el fichero en formato csv
	
- Tests
	- Unitarios
	- Integración
	- ¿Funcionales?
	- End-to-end
	- ¿Regresión?
	- Smoke
	- ¿Aceptación?
	- ¿Performance?

-----------------------------------------------------------------------------------------------------------
	
1. Opciones de configuración para el procesamiento de datos:
	- Preprocesado:
		- Eliminación de registros incorrectos: Detectar y eliminar registros con datos inválidos, como valores de consumo "unavailable" o formatos incorrectos.
		- Valor por defecto para datos faltantes o incorrectos: Permitir definir un valor por defecto para reemplazar valores incorrectos (por defecto, 0).
		- Si no se aplican ninguna de estas opciones, los valores incorrectos se establecerán como NaN.
	- Procesado:
		- Intervalo de agrupación: Permitir al usuario establecer un periodo de agrupación para los datos: 15min., 30min. o 60min. (por defecto, 15 minutos).
		- Rellenar huecos según la agrupación: Si faltan datos en un intervalo, se deben rellenar usando un valor por defecto o interpolación (según la configuración).
	
2. Formato del fichero de entrada (.csv):
	- El fichero CSV tendrá las siguientes columnas:
		- Nombre del dispositivo: Identificador único o nombre del dispositivo.
		- Consumo en W: Potencia consumida por el dispositivo en cada registro.
		- Fecha de registro: Fecha y hora del registro en formato ISO 8601 (YYYY-MM-DDTHH:MM:SS)
	
3. Algoritmo de procesamiento:
	- Cargar el fichero CSV:
		- Leer cada registro del fichero.
	
	- Validación de datos de entrada:
		- Validar valores de consumo: Comprobar si los valores de consumo son numéricos (int, float, double). Si no lo son, aplicar el valor por defecto o eliminar el registro según la configuración.
		- Validar fechas: Asegurarse de que las fechas estén en el formato ISO 8601. Los registros con fechas incorrectas se eliminan o ajustan según configuración.

	- Limpieza de datos:
		- Eliminación de registros incorrectos (opcional):
			- Si la opción está habilitada, eliminar los registros que contengan valores no válidos o fechas incorrectas.
	
		- Sustitución de valores incorrectos (opcional):
			- Si la configuración lo permite, reemplazar valores no numéricos o faltantes por un valor por defecto.
	
		- Ordenar los registros por fecha:
			- Asegurarse de que los datos estén ordenados cronológicamente de la fecha más antigua a la más reciente.
		
	- Ajuste de los registros a la agrupación:
		- Agrupar registros: Los datos se ajustan al periodo de agrupación establecido (por defecto, 15 minutos).
			- Si no hay registros en un intervalo de agrupación, usar el valor por defecto configurado. (opcional)
			- Si hay un único valor en un intervalo, tomar ese valor como el consumo para ese intervalo.
			- Si hay múltiples valores dentro de un intervalo de agrupación, calcular el promedio de esos valores y asignarlo al intervalo.
		- Fecha del intervalo: La fecha de cada registro agrupado será la del inicio del intervalo correspondiente, formateada en ISO 8601.
	
	- Rellenar huecos (opcional):
		- Si se detectan huecos entre registros consecutivos, de forma opcional calcular los nuevos registros mediante interpolación lineal.
	
	- Guardar el fichero de salida:
		- Escribir los datos procesados y ajustados a un nuevo fichero CSV con el mismo formato de columnas: Nombre del dispositivo, Consumo en W, Fecha de registro.
