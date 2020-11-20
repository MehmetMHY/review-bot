# discord bot main python script
import os
import discord
from dotenv import load_dotenv
import random
import time
from datetime import date

def textFileSave(filename, data):
    with open(filename, 'w') as f:
        for item in data:
            f.write("%s\n" % item)

def loadFile(filename):
    with open(filename) as f:
        lines = f.read().splitlines()
    return lines

def pick(last_time, up, down):
    kitchen = up.copy() + down.copy()
    kitchen1, kitchen2, up_bath, down_bath = last_time

    kitchen.remove(kitchen1)
    kitchen.remove(kitchen2)

    new_list = []
    new_list.append(random.choice(kitchen))
    kitchen.remove(new_list[0])
    new_list.append(random.choice(kitchen))

    up.remove(up_bath)
    down.remove(down_bath)

    upr = ""
    dnr = ""
    end = True
    while(end):
        upr = random.choice(up)
        end = False
        if upr in new_list:
            end = True
        
        dhr = random.choice(down)
        end = False
        if upr in new_list:
            end = True

    new_list.append(upr)
    new_list.append(dhr)

    return new_list

def printFormat(data):
    embed = discord.Embed(title=f"__**TO-DO THIS WEEK**__", color=0x03f8fc)
    embed.add_field(name=str(date.today()), value=f'> **Kitchen1:** {data[0]}\n> **Kitchen2:** {data[1]}\n>   **UpBath:** {data[2]}\n> **DownBath:** {data[3]}',inline=False)
    return embed

def clean_list():
    down_list = ['Linlee', 'Daphne', 'Will']                                
    up_list = ['Lucas', 'Mehmet', 'Dylan']

    # format: kitchen1, kitchen2, up_bath, down_bath
    last_grouping = loadFile("last_people.txt")

    new_people = pick(last_grouping, up_list, down_list)

    message = printFormat(new_people)

    textFileSave("last_people.txt", new_people)

    return message

load_dotenv()
TOKEN = os.getenv('BOT_TOKEN')

client = discord.Client()

@client.event
async def on_ready():
    print(f'connected to discord as {client.user}')

@client.event
async def on_message(message):
    if message.author == client.user:
        return

    if "meme" in message.content.lower():
        response = "REVIEW"
        await message.channel.send(response)
    
    if "cleanlist" in message.content.lower():
        await message.channel.send(embed=clean_list())

client.run(TOKEN)
