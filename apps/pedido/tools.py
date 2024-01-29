from django.utils import timezone

def sumar_dias_habiles(dia_hoy, dias_habiles_a_sumar):
            dias_a_sumar = 0

            while dias_a_sumar < dias_habiles_a_sumar:
                # Incrementamos el día en 1
                dia_hoy += timezone.timedelta(days=1)  # Utilizamos timedelta de Django

                
                # Si es un día hábil (lunes=0, martes=1, ..., viernes=4)
                if dia_hoy.weekday() < 5:
                    dias_a_sumar += 1

            return dia_hoy


def comparar_horas(arr, tiempo):
    # SI SOLO HAY UN ELEMENTO EN EL ARR DEVUELVE EL ELEMENTO Y YA
        menor = min(arr, key=lambda x: x.hora_limite)
        mayor = max(arr, key=lambda x: x.hora_limite)

        if menor.hora_limite > tiempo.hour:
            return menor
        else: 
            return mayor

    