import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Image, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import Logo from '../../assets/logo-header.png'
import SearchInput from '../../components/SearchInput'
import api from '../../services/api'
import formatValue from '../../utils/formatValue'
import {
  CategoryContainer,
  CategoryItem,
  CategoryItemTitle,
  CategorySlider,
  Container,
  FilterContainer,
  Food,
  FoodContent,
  FoodDescription,
  FoodImageContainer,
  FoodList,
  FoodPricing,
  FoodsContainer,
  FoodTitle,
  Header,
  Title
} from './styles'

interface Food {
  id: number
  name: string
  description: string
  price: number
  thumbnail_url: string
  formattedPrice: string
}

interface Category {
  id: number
  title: string
  image_url: string
}

const Dashboard: React.FC = () => {
  const [foods, setFoods] = useState<Food[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>()
  const [searchValue, setSearchValue] = useState('')

  const navigation = useNavigation()

  async function handleNavigate(id: number): Promise<void> {
    // Navigate do ProductDetails page
  }

  useEffect(() => {
    async function loadFoods(): Promise<void> {
      const foodList = await api.get('foods')
      console.log(foodList)

      /*   console.log([
        (foodList.data = {
          ...foodList.data,
          formattedPrice: formatValue(foodList.data.price)
        })
      ])
 */
      setFoods([
        (foodList.data = {
          ...foodList.data,
          formattedPrice: formatValue(foodList.data.price)
        })
      ])
    }

    loadFoods()
  }, [selectedCategory, searchValue])

  useEffect(() => {
    async function loadCategories(): Promise<void> {
      const loadCategoriesList = await api.get('categories')
      setCategories(loadCategoriesList.data)
    }

    loadCategories()
  }, [])

  function handleSelectCategory(id: number): void {
    // Select / deselect category
  }

  return (
    <Container>
      <Header>
        <Image source={Logo} />
        <Icon
          name="log-out"
          size={24}
          color="#FFB84D"
          onPress={() => navigation.navigate('Home')}
        />
      </Header>
      <FilterContainer>
        <SearchInput
          value={searchValue}
          onChangeText={setSearchValue}
          placeholder="Qual comida você procura?"
        />
      </FilterContainer>
      <ScrollView>
        <CategoryContainer>
          <Title>Categorias</Title>
          <CategorySlider
            contentContainerStyle={{
              paddingHorizontal: 20
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {categories.map(category => (
              <CategoryItem
                key={category.id}
                isSelected={category.id === selectedCategory}
                onPress={() => handleSelectCategory(category.id)}
                activeOpacity={0.6}
                testID={`category-${category.id}`}
              >
                <Image
                  style={{ width: 56, height: 56 }}
                  source={{ uri: category.image_url }}
                />
                <CategoryItemTitle>{category.title}</CategoryItemTitle>
              </CategoryItem>
            ))}
          </CategorySlider>
        </CategoryContainer>
        <FoodsContainer>
          <Title>Pratos</Title>
          <FoodList>
            {foods.map(food => (
              <Food
                key={food.id}
                onPress={() => handleNavigate(food.id)}
                activeOpacity={0.6}
                testID={`food-${food.id}`}
              >
                <FoodImageContainer>
                  <Image
                    style={{ width: 88, height: 88 }}
                    source={{ uri: food.thumbnail_url }}
                  />
                </FoodImageContainer>
                <FoodContent>
                  <FoodTitle>{food.name}</FoodTitle>
                  <FoodDescription>{food.description}</FoodDescription>
                  <FoodPricing>{food.formattedPrice}</FoodPricing>
                </FoodContent>
              </Food>
            ))}
          </FoodList>
        </FoodsContainer>
      </ScrollView>
    </Container>
  )
}

export default Dashboard