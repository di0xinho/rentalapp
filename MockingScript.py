#!/usr/bin/env python
# coding: utf-8

# In[11]:


# Instalujemy pakiet o nazwie "Faker"
get_ipython().system('pip install Faker')


# In[13]:


# Importujemy potrzebną do mockowania danych klasę oraz wbudowane do Anacondy: bibliotekę random i json
from faker import Faker
import random
import json


# In[14]:


# Tworzymy obiekt klasy Faker
fake = Faker()


# In[15]:


# Tworzymy zmienne tablicowe pod dane zawierające m.in. marki i modele samochodów

# marka i model
makeAndModel = {
    'Audi': ['A1', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'Q2', 'Q3', 'Q5', 'Q7', 'Q8', 'R8', 'RS4', 'RS5', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'SQ2', 'SQ5', 'TT'],
    'BMW': ['1 Series', '2 Series', '3 Series', '4 Series', '5 Series', '6 Series', '7 Series', '8 Series', 'M2', 'M3', 'M4', 'M5', 'M6', 'X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7', 'Z4'],
    'Fiat': ['Fiorino', 'Freemont', 'Fullback', 'Panda', 'Punto', '124', '500'],
    'Ford': ['Bronco', 'Edge', 'Escape', 'Expedition', 'Explorer', 'F-150', 'F-250', 'F-350', 'Fiesta', 'Focus', 'Fusion', 'Mustang', 'Ranger', 'Transit', 'Transit Connect'],
    'Honda': ['Accord', 'Civic', 'Clarity', 'CR-V', 'Fit', 'HR-V', 'Insight', 'Odyssey', 'Passport', 'Pilot', 'Ridgeline'],
    'Mercedes-Benz': ['A-Class', 'B-Class', 'C-Class', 'CLA-Class', 'CLS-Class', 'E-Class', 'G-Class', 'GLA-Class', 'GLB-Class', 'GLC-Class', 'GLE-Class', 'GLS-Class', 'S-Class', 'SL-Class', 'SLS-Class', 'V-Class'],
    'Opel': ['Astra', 'Combo', 'Corsa', 'Crossland/Crossland X', 'Grandland/Grandland X', 'Insignia', 'Mokka', 'Movano'],
    'Toyota': ['Avalon', 'Camry', 'Corolla', 'Highlander', 'Land Cruiser', 'Prius', 'RAV4', 'Sienna', 'Tacoma', 'Tundra'],
    'Volkswagen': ['Golf', 'T-Roc', 'Polo', 'Tiguan' , 'T-Cross', 'Passat']
}

# kolor 
color = ['czarny', 'biały', 'niebieski', 'szary', 'czerwony', 'granatowy']

# rodzaj karoserii
bodyType = ['Sedan', 'Coupe', 'Hatchback', 'SUV', 'Crossover']

# rodzaj skrzyni biegów
gearboxType = ['Manualna', 'Automatyczna']

# rodzaj paliwa
fuelType = ['Benzyna', 'Diesel', 'Elektryk', 'Hybryda']

# cena za godzinę
hourlyPrice = [25 ,40, 50, 60, 70, 80, 90, 100, 120]

# adresy URL zdjęć samochodów (wszystkie zdjęcia pochodzą z serwisu gettyimages.com)
imageURL = [
    
'https://media.gettyimages.com/id/155442161/photo/white-modern-compact-car-on-white-background.jpg?s=2048x2048&w=gi&k=20&c=0J8nfT5TSLcYjInRlfyVIipeKgvZ0ON3N5OgRcMWMwU=',
    
'https://media.gettyimages.com/id/879766344/photo/car-driving-on-a-road-by-sea.jpg?s=2048x2048&w=gi&k=20&c=wa2-bOd3bT9eXCMZGmStteV07yZbgF7Ef6G5ZChYPxI=',

'https://media.gettyimages.com/id/94294294/photo/blue-suv-with-clipping-paths.jpg?s=2048x2048&w=gi&k=20&c=F-VtDX9B79DBeLX24EVPK2-vy0dyU3PfmNFG6owuSi0=',

'https://media.gettyimages.com/id/989068852/photo/desert-defender.jpg?s=2048x2048&w=gi&k=20&c=YFGIsQIIwuTW-Gdt0JxRkJOAYRx6IcBUmF7kHX6Nquk=',

'https://media.gettyimages.com/id/1307086567/photo/generic-modern-suv-car-in-concrete-garage.jpg?s=2048x2048&w=gi&k=20&c=HgmO8r5R-jIcWityyGinOlM912rmfA53u901MdMkWok=',

'https://media.gettyimages.com/id/1379611333/photo/generic-modern-car-in-front-of-concrete-wall.jpg?s=2048x2048&w=gi&k=20&c=Uec-TdCFhwaSZjZvAKWdUVteClGHWHs03DmICrhk_dQ=',

'https://media.gettyimages.com/id/672151647/photo/silver-car-speeding-on-bridge.jpg?s=2048x2048&w=gi&k=20&c=C4QgEYzOBXL7EOs1T0lHCxiQjfpBMVtFV572oLCbS_E=',

'https://media.gettyimages.com/id/1255788362/photo/generic-modern-car-as-product-shot.jpg?s=2048x2048&w=gi&k=20&c=KnoLE7lFgV-FrSfPn0bet7X_zA5HSwar-3qW3Yg4lWs='
    
]

# krótki opis auta - dla każdego ustawiany będzie taki sam
description = "Jeśli szukasz samochodu, który zapewni Ci niezapomniane wrażenia podczas jazdy i pozwoli Ci swobodnie przemieszczać się po mieście lub poza nim, to nasz samochód będzie idealnym wyborem! Nasze auto ma wnętrze z eleganckim designem, które nie tylko wygląda świetnie, ale także zapewnia znakomite osiągi na drodze."

# czas, w którym samochód będzie wypożyczany
bookedTimeSlots = []

# dostępność samochodu
isAvailable = True


# In[16]:


# Generujemy losowe dane do samochodów - będzie 50 rekordów
data = []

for i in range(50):
    
    make = random.choice(list(makeAndModel.keys()))
    
    model = random.choice(makeAndModel[make])

    record = {
        "make": make,
        "model": model,
        "capacity": fake.random_element(elements = (4, 5, 7)),
        "year": fake.random_int(min = 1995, max = 2022),
        "color": fake.random_element(elements = color),
        "bodyType": fake.random_element(elements = bodyType),
        "gearboxType": fake.random_element(elements = gearboxType),
        "mileage" : fake.random_int(min = 75000, max = 350000),
        "fuelType" : fake.random_element(elements = fuelType),
        "hourlyPrice": fake.random_element(elements = hourlyPrice),
        "imageUrl": fake.random_element(elements = imageURL),
        "description": description,
        "bookedTimeSlots": bookedTimeSlots,
        "isAvailable": isAvailable
    }
    data.append(record)


# In[17]:


with open(r'C:\Users\mm-20\Desktop\Mock_Data.json', 'w') as outfile:
    json.dump(data, outfile)


# In[ ]:




