import pdb
from rest_framework import serializers
from category.models import Category, Pokemon


class PokemonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pokemon
        fields = ['id', 'pokemon_id']


class CategorySerializer(serializers.ModelSerializer):
    pokemons = PokemonSerializer(many=True)

    class Meta:
        model = Category
        fields = ['id', 'category', 'pokemons']
        extra_kwargs = {'category': {'required': False}}

    def update(self, instance, validated_data):
        pokemons_data = validated_data.get('pokemons', [])
        # print(pokemon_data, "pokemon-----dataaaaaaaaaaa")
        for pokemon in pokemons_data:
            current_pokemon_id = pokemon.get('pokemon_id')
            try:
                pokemon_model = Pokemon.objects.get(
                    pokemon_id=current_pokemon_id)
                pokemon_model.category = instance
                pokemon_model.save()
            except Pokemon.DoesNotExist:
                Pokemon.objects.create(category=instance, **pokemon)
        return instance

    def create(self, validated_data):
        pokemons_data = validated_data.pop('pokemons')
        category = Category.objects.create(**validated_data)

        for pokemon in pokemons_data:
            Pokemon.objects.create(category=category, **pokemon)
        return category
