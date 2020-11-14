# discord bot main python script
import os
import discord
from dotenv import load_dotenv

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

client.run(TOKEN)
