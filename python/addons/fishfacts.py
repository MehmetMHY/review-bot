import random 	# Import random number generator

def load_text():		
	with open("fishfacts.txt") as facts_file: 		# Load the text file
		facts = list(facts_file)		# Create a list of facts
	return facts

def get_fact(facts):
	current_fact = random.choice(facts)		# Randomly choose a fact
	return current_fact.replace("\n", "")

def bot():
	facts = load_text()
	current_fact = get_fact(facts)
	return str(current_fact)



