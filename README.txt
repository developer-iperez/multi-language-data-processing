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

[NOTA] 0. Opciones de configuración global
[NOTA] ¿Especificar en los requisitos que el consumo es en W o kW?

X1. Opciones de configuración para el procesamiento de datos:
	X- Preprocesado:
		X- Eliminación de registros incorrectos: Detectar y eliminar registros con datos inválidos. 
			- Los valores de consumo incorrectos son aquellos que no sean numéricos válidos.
			- Los valores de fecha incorrectos son aquellos que no estén en formato ISO 8601.
		X- Valor por defecto para datos faltantes o incorrectos: Permitir definir un valor de potencia por defecto para reemplazar valores incorrectos. Si no se indica nada, será 0.
		X- Si no se aplican ninguna de estas opciones, los valores incorrectos se establecerán como NaN. 
			[NOTA] CONTRADICCION_PUNTO_A1 -> YA SE ACLARA EN LOS NUEVO REQ. QUE EL VALOR POR DEFECTO ES EL DE ENTRADA
	- Procesado:
		X- Intervalo de agrupación: Permitir al usuario establecer un periodo de agrupación para los datos: 15min., 30min. o 60min. (por defecto, 15 minutos).
			[NOTA] Especificar los valores de entrada 15min, 30min, 60min
			[NOTA] Especificar que las intradas incorrectas no ejecutarán la aplicación
		X- Rellenar huecos según la agrupación: Si faltan datos en un intervalo, se deben rellenar usando un valor por defecto o interpolación (según la configuración).
		[NOTA] Opción para Rellenar Huecos: Activar/Desactivar. Si activado, usar interpolación lineal; si desactivado, reemplazar con valor por defecto.

X2. Formato del fichero de entrada (.csv):
	X- El fichero CSV tendrá las siguientes columnas:
		X- Nombre del dispositivo: Identificador único o nombre del dispositivo (cualquier cadena de texto).
		X- Consumo en W: Potencia consumida por el dispositivo en cada registro (valores double).
		X- Fecha de registro: Fecha y hora del registro en formato ISO 8601 (YYYY-MM-DDTHH:MM:SS)
			[NOTA] Si el valor de fecha de un registro no cumple con el patrón, el registro queda invalidado
	
3. Algoritmo de procesamiento:
	X- Cargar el fichero CSV:
		X- Leer cada registro del fichero.
		[NOTA] En caso de no poder procesar el fichero, mostrar qué errores se mostrarán al usuario.

	X- Validación de datos de entrada:
		X- Validar valores de consumo: Comprobar si los valores de consumo son numéricos (int, float, double). Si no lo son, aplicar el valor por defecto o eliminar el registro según la configuración.
			[NOTA] CONTRADICCION_PUNTO_A1 -> YA SE ACLARA EN LOS NUEVO REQ. QUE EL VALOR POR DEFECTO ES EL DE ENTRADA
			[NOTA] ¿Valor por defecto 0 o configurable?
		X- Validar fechas: Asegurarse de que las fechas estén en el formato ISO 8601. Los registros con fechas incorrectas se eliminan o ajustan según configuración.
		[NOTA] Más que eliminar o "ajustar", sería marcar el registro como incorrecto

	- Limpieza de datos:
		X- Eliminación de registros incorrectos (opcional):
			X- Si la opción está habilitada, eliminar los registros que contengan valores no válidos o fechas incorrectas.
			[NOTA] CONTRADICCION_PUNTO_A2: opciones excluyentes -> SE ACLARA QUE LOS REGISTROS INVÁLIDOS SE ELIMINARÁN

		X- Sustitución de valores incorrectos (opcional):
			X- Si la configuración lo permite, reemplazar valores no numéricos o faltantes por un valor por defecto.
			[NOTA] CONTRADICCION_PUNTO_A2: opciones excluyentes -> SE ACLARA QUE LOS REGISTROS INVÁLIDOS SE ELIMINARÁN
			[NOTA] ¿Valor por defecto 0 o configurable?

		X- Ordenar los registros por fecha:
			X- Asegurarse de que los datos estén ordenados cronológicamente de la fecha más antigua a la más reciente.
		
		[NOTA] Especificar que el orden será el indicado.
		[NOTA] ¿Proporcionar opciones al usuario para corregir los errores?

	X- Ajuste de los registros a la agrupación:
		X- Agrupar registros: Los datos se ajustan al periodo de agrupación establecido (por defecto, 15 minutos).
			X- Si no hay registros en un intervalo de agrupación, usar el valor por defecto configurado. (opcional)
			[NOTA] ¿Valor por defecto 0 o configurable?
			X- Si hay un único valor en un intervalo, tomar ese valor como el consumo para ese intervalo.
			X- Si hay múltiples valores dentro de un intervalo de agrupación, calcular el promedio de esos valores y asignarlo al intervalo.
			[NOTA] ¿Promedio simple o ponderado?
		X- Fecha del intervalo: La fecha de cada registro agrupado será la del inicio del intervalo correspondiente, formateada en ISO 8601.
	
	X- Rellenar huecos (opcional):
		X- Si se detectan huecos entre registros consecutivos, de forma opcional calcular los nuevos registros mediante interpolación lineal.
		[NOTA] Si hay huecos demasiado grandes, ¿como procede la interpolación? ¿Se inventa los huecos?
		[NOTA] Por ejemplo, si el intervalo es 15 minutos, y hay datos a las 00:00, 00:15, 00:30, etc., pero falta un registro a las 00:20, se interpolaría a partir de los valores disponibles

	X- Guardar el fichero de salida:
		X- Escribir los datos procesados y ajustados a un nuevo fichero CSV con el mismo formato de columnas: Nombre del dispositivo, Consumo en W, Fecha de registro.
		[NOTA] ¿Mostrar en los datos de salida metadata como por ejemplo si el valor del registro ha sido interpolado o si se aplicó valor por defecto?
		[NOTA] Si todo ha ido bien ¿generar un informe con los cambios realizados y mostrando estadísticas?

-----------------------------------------------------------------------------------------------------------

1. Validación de parámetros de entrada
	x- Campos de entrada:
		x- Fichero de entrada:
			x- El usuario deberá indicar el fichero a procesar, indicando la ruta completa del fichero y el nombre con la extensión.
			x- Esta opción será obligatoria.
		x- Fichero de salida:
			x- El usuario deberá incidar el fichero de salida, indicando la ruta completa del fichero y el nombre con la extensión.
			x- Este fichero debe ser diferente al fichero de entrada.
			x- Esta opción será obligatoria.
		x- Valor por defecto para datos de potencia faltantes o incorrectos:
			x- El usuario puede definir un valor por defecto para reemplazar valores incorrectos. 
			x- Este valor deberá ser un valor de tipo double. 
			x- Por defecto será 0.0.
			x- Esta opción será opcional.
		x- Intervalo de agrupación: 
			x- El usuario debe establecer un periodo de agrupación para los datos, especificado en minutos. 
			x- Los valores permitidos serán 15, 30 o 60. 
			x- Por defecto será 15.
			x- Esta opción será opcional.
		x- Rellenar huecos según la agrupación:
			x- El usuario puede indicar si quiere que se rellenen huecos o no. 
			x- En caso habilitar esta opción y faltar datos en un intervalo, se aplicará interpolación simple para calcular los datos faltantes.
			x- Los valores permitidos será "enabled" y "disabled".
			x- Por defecto será "disabled"
			x- Esta opción será opcional.
	x- En caso de que los valores de entrada no sean válidos, se mostrará un mensaje del primer error encontrado y la aplicación se detendrá.

2. Abrir el fichero a procesar y validar el formato y valores
	- Abrir fichero:
		- En caso que el fichero no exista o no se pueda abrir se mostrará un mensaje de error y la aplicación se detendrá.
		- En caso contrario, se continuará con la validación del contenido del fichero
	- Validación del formato:
		- El fichero CSV debe estar correctamente formateado con cabecera y valores separados por comas (CSV).
		- El fichero debe tener una cabecera con los nombres de las columnas: "Device", "Consumption" y "Date".
			- Si el fichero no tiene esta cabera se mostrará un mensaje de error indicando que la cabecera no es correcta y la aplicación se detendrá.
	- Validación de los valores:
		- Los valores de la columna "Device" podrá ser de tipo alfanumérico.
		- Los valores de la columna "Consumption" deberán ser valores numéricos de tipo double.
			- Si el valor no es numérico, el registro se marcará como inválido por el valor de potencia.
		- Los valores de la columna "Date" deberán ser un valor de fecha válida en formato ISO 8601 (YYYY-MM-DDTHH:MM:SS)
			- Si la fecha no es correcta, el registro se marcará como inválido por el valor de la fecha.
	- Si se han detectado registros inválidos:
		- Si el campo "Consumption" es inválido, se reemplazará por el valor por defecto establecido en la configuración.
		- Si el campo "Date" es inválido, se marcará que el registro es inválido y no se tendrá en cuenta para el procesamiento.

3. Procesamiento de los registros:
	- Limpieza de datos:
		- Se eliminarán, del conjunto de datos a procesar, aquellos registros con campos inválidos.
			- Los registros eliminados se guardarán para ser mostrados en el reporte final.
		- Se eliminarán, del conjunto de datos a procesar, aquellos registros con campos fecha duplicada.
		- Sustitución de valores de consumo incorrectos. Se reemplarán por el valor por defecto establecido en la configuración.
		- Ordenar los registros por fecha: asegurarse de que los datos estén ordenados cronológicamente de la fecha más antigua a la más reciente.
	- Ajuste de los registros a la agrupación:
		- Agrupar registros: Los datos se ajustan al periodo de agrupación establecido según la configuración establecida.
			- Si no hay registros en un intervalo de agrupación, usar el valor por defecto configurado.
			- Si hay un único valor en un intervalo, tomar ese valor como el consumo para ese intervalo.
			- Si hay múltiples valores dentro de un intervalo de agrupación, calcular el promedio simple de esos valores y asignarlo al intervalo.
			- La fecha de cada registro agrupado será la del inicio del intervalo correspondiente, en formato ISO 8601.
	- Rellenar huecos (aplicable según configuración):
		- Si se detectan huecos entre registros consecutivos, calcular los nuevos registros mediante interpolación lineal.
			- DUDA: Si hay huecos demasiado grandes, ¿como procede la interpolación? ¿Se inventa los huecos?
			- Por ejemplo, si el intervalo es 15 minutos, y hay datos a las 00:00, 00:15, 00:30, etc., pero falta un registro a las 00:20, se interpolaría a partir de los valores disponibles
	
4. Finalización del procesamiento:
	- Generación del Fichero CSV final:
		- Escribir los datos procesados en un nuevo fichero CSV con la misma estructura que el fichero de entrada.
		- Si el fichero de salida no puede ser generado, mostrar un mensaje de error.
	- Mostrar un reporte final:
		- El fichero de salida generado
		- Total de registros de entrada
		- Total de registros aplicados al procesamiento
		- Total de registros generados
		- Total de registros inválidos

----------------------------------------------------------------------------------------------------------------

Ejemplo de Flujo Lógico:

Carga del Fichero CSV:
	Leer el fichero y comprobar su formato.
Validación de Valores de Consumo:
	Comprobar que todos los valores de consumo sean numéricos; si no, aplicar el valor por defecto o eliminar el registro según la configuración seleccionada.
Validación de Fechas:
	Comprobar que todas las fechas estén en el formato ISO 8601; si no, ajustarlas o eliminar los registros respectivos.
Ajuste a Agrupación:
	Seleccionar el intervalo de agrupación según la configuración del usuario.
	Agrupar los datos en función del intervalo seleccionado.
Rellenado de Huecos:
	Si se activa la opción, rellenar los huecos utilizando interpolación lineal o reemplazando con el valor por defecto.
Ordenar Registros por Fecha:
	Ordenar los datos cronológicamente antes de generar la salida final.
Generar Salida Final:
	Crear un nuevo fichero CSV con los datos limpios, agrupados y ordenados.
