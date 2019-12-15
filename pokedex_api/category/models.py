from django.db import models


class Category(models.Model):
    category = models.CharField(max_length=1000)


class Pokemon(models.Model):
    pokemon_id = models.IntegerField()
    category = models.ForeignKey(
        'Category', related_name="pokemons", on_delete=models.CASCADE)

    def __str__(self):
        return str(self.pokemon_id)
