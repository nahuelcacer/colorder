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


def comparar_horas(tiempo, lista_entregas):
    entrega_menor_limite = None
    entrega_mayor_limite = None

    for entrega in lista_entregas:
        if tiempo.hour > entrega["hora_limite"]:
            if entrega_menor_limite is None or entrega["hora_limite"] < entrega_menor_limite["hora_limite"]:
                entrega_menor_limite = entrega
        else:
            if entrega_mayor_limite is None or entrega["hora_limite"] > entrega_mayor_limite["hora_limite"]:
                entrega_mayor_limite = entrega

    if entrega_menor_limite is not None:
        return entrega_menor_limite
    else:
        return entrega_mayor_limite