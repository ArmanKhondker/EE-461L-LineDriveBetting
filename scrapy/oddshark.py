from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options

from pymongo import MongoClient

import time
import sys

if len(sys.argv) < 2:
    print('Need to pass an argument for sport type')
    exit()

arg = sys.argv[1]

if arg == 'nfl':
    url = 'https://www.oddsshark.com/nfl/odds'
if arg == 'nba':
    url = 'https://www.oddsshark.com/nba/odds'
if arg == 'mlb':
    url = 'https://www.oddsshark.com/mlb/odds'

options = Options()
options.headless = True
driver = webdriver.Chrome(options=options)
driver.implicitly_wait(10)

client = MongoClient("mongodb+srv://linedrivebetting:texaslonghorns@cluster0-w7pi2.mongodb.net/test?retryWrites=true&w=majority")
db = client.sports_data

driver.get(url)
time.sleep(1)
link_elements = driver.find_elements_by_class_name('full-matchup')
links = []
for link in link_elements:
    links.append(link.get_attribute('href'))

dates = []
moneylines = []
for link in links:
    driver.get(link)
    date = driver.find_element_by_class_name('gc-date').text
    dates.append(date)
    driver.find_element_by_xpath('//*[@id="gc-content"]/div/div[2]/div[1]/div/div/div[1]/div[1]/ul/li[1]/span').click()
    line = driver.find_elements_by_class_name('moneyline')
    if len(line) < 13:
        if type(line) is not list:
            line = []
            line[0] = 'trash'
        j = len(line)
        while j < 13:
            line[j] = 'not released yet'
    texts = []
    for elem in line[1:13]:
        if elem is '0':
            texts.append('not released yet')
            continue
        texts.append(elem.text)
    j = 0
    for elem in texts:
        if elem is '':
            texts[j] = 'not released yet'
        j = j + 1   
    moneylines.append(texts)

driver.get(url)
teamdata = driver.find_element_by_xpath("//*[@id='op-content-wrapper']/div[1]/div[1]")
matchups = teamdata.find_elements_by_class_name('op-matchup-wrapper')
scorelines = driver.find_element_by_id("op-results").find_elements_by_class_name('op-item-row-wrapper')
systime = time.gmtime()
for matchup, date, scoreline, moneyline in zip(matchups, dates, scorelines, moneylines):
    match_data = matchup.text.split('\n')
    obj = {}

    if len(match_data) < 5:
        match_time = match_data[0]
        team1 = match_data[2]
        team2 = match_data[3]
    else:
        match_time = match_data[0]
        team1 = match_data[4]
        team2 = match_data[5]
    
    score_data = scoreline.text.split('\n')
    j = 0
    if(len(score_data) < 24):
        j = len(score_data)
        if(j == 1):
            score_data[0] = 'not released yet'
        while j < 24:
            score_data.append('not released yet')
            j = j + 1
    
    if arg == 'nfl':
        match = db.nfl_data.find_one({"date": date, "team1": team1, "team2": team2})
    if arg == 'nba':
        match = db.nba_data.find_one({"date": date, "team1": team1, "team2": team2})
    if arg == 'mlb':
        match = db.mlb_data.find_one({"date": date, "team1": team1, "team2": team2})

    if match:
        #update
        match['sys_time'].append(systime)
        match['opening_ps_1'].append(score_data[0])
        match['opening_ml_1'].append(moneyline[0])
        match['opening_ps_2'].append(score_data[2])
        match['opening_ml_2'].append(moneyline[1])
        match['bovada_ps_1'].append(score_data[4])
        match['bovada_ml_1'].append(moneyline[2])
        match['bovada_ps_2'].append(score_data[6])
        match['bovada_ml_2'].append(moneyline[3])
        match['betonline_ps_1'].append(score_data[8])
        match['betonline_ml_1'].append(moneyline[4])
        match['betonline_ps_2'].append(score_data[10])
        match['betonline_ml_2'].append(moneyline[5])
        match['intertops_ps_1'].append(score_data[12])
        match['intertops_ml_1'].append(moneyline[6])
        match['intertops_ps_2'].append(score_data[14])
        match['intertops_ml_2'].append(moneyline[7])
        match['sportsbetting_ps_1'].append(score_data[16])
        match['sportsbetting_ml_1'].append(moneyline[8])
        match['sportsbetting_ps_2'].append(score_data[18])
        match['sportsbetting_ml_2'].append(moneyline[9])
        match['betnow_ps_1'].append(score_data[20])
        match['betnow_ml_1'].append(moneyline[10])
        match['betnow_ps_2'].append(score_data[22])
        match['betnow_ml_2'].append(moneyline[11])
        if arg == 'nfl':
            db.nfl_data.replace_one({'_id': match['_id']}, match)
        if arg == 'nba':
            db.nba_data.replace_one({'_id': match['_id']}, match)
        if arg == 'mlb':
            db.mlb_data.replace_one({'_id': match['_id']}, match)
    else:
        #make a new one
        obj['date'] = date
        obj['time'] = match_time
        obj['team1'] = team1
        obj['team2'] = team2
        obj['sys_time'] = [systime]
        obj['opening_ps_1'] = [score_data[0]]
        obj['opening_ml_1'] = [moneyline[0]]
        obj['opening_ps_2'] = [score_data[2]]
        obj['opening_ml_2'] = [moneyline[1]]
        obj['bovada_ps_1'] = [score_data[4]]
        obj['bovada_ml_1'] = [moneyline[2]]
        obj['bovada_ps_2'] = [score_data[6]]
        obj['bovada_ml_2'] = [moneyline[3]]
        obj['betonline_ps_1'] = [score_data[8]]
        obj['betonline_ml_1'] = [moneyline[4]]
        obj['betonline_ps_2'] = [score_data[10]]
        obj['betonline_ml_2'] = [moneyline[5]]
        obj['intertops_ps_1'] = [score_data[12]]
        obj['intertops_ml_1'] = [moneyline[6]]
        obj['intertops_ps_2'] = [score_data[14]]
        obj['intertops_ml_2'] = [moneyline[7]]
        obj['sportsbetting_ps_1'] = [score_data[16]]
        obj['sportsbetting_ml_1'] = [moneyline[8]]
        obj['sportsbetting_ps_2'] = [score_data[18]]
        obj['sportsbetting_ml_2'] = [moneyline[9]]
        obj['betnow_ps_1'] = [score_data[20]]
        obj['betnow_ml_1'] = [moneyline[10]]
        obj['betnow_ps_2'] = [score_data[22]]
        obj['betnow_ml_2'] = [moneyline[11]]
        if arg == 'nfl':
            db.nfl_data.insert_one(obj)
        if arg == 'nba':
            db.nba_data.insert_one(obj)
        if arg == 'mlb':
            db.mlb_data.insert_one(obj)

driver.quit()
