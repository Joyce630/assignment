# Assignment#3 OpenRefine

<br> Clean data on airtable:https://airtable.com/invite/l?inviteId=invcCU8m3eYGzKOKc&inviteToken=ee58ea86345ab264991295ddcc9426e8e497c842704f1a99d7eedc88688fc03a

<br>
<b>Step1: use ParseHub to scrap data, data source webpage: </b>
<br>(1)Weather:
<br>https://www.weather-atlas.com/zh/italy/naples-climate
<br>https://www.weather-atlas.com/zh/italy/venice-climate
<br>https://www.weather-atlas.com/zh/italy/capri-climate
<br>https://www.weather-atlas.com/zh/italy/rome-climate
<br>https://www.weather-atlas.com/zh/italy/sardinia-climate   (Because the "seawater" data was not founded in this webpage, it was retrieved from the following webpage)
<br>https://seatemperature.info/porto-cervo-water-temperature.html
<br>(2)Restaurants:
<br>https://www.tripadvisor.com.hk/Restaurants-g1783025-Island_of_Capri_Province_of_Naples_Campania.html
<br>https://www.tripadvisor.com.hk/Restaurants-g187791-Rome_Lazio.html
<br>https://www.tripadvisor.com.hk/Restaurants-g1725258-City_of_Venice_Veneto.html
<br>https://www.tripadvisor.com.hk/Restaurants-g194856-Porto_Cervo_Arzachena_Province_of_Olbia_Tempio_Sardinia.html
<br>https://www.tripadvisor.com.hk/Restaurants-g187785-Naples_Province_of_Naples_Campania.html
<br>And there was one interesting finding that the prices were shown in HK dollars in the original webpage, but they were automatically converted into US dollar after being scraped.

<br><br>
<b>Step2: </b>
<br>The data in original webpages was orderly so the cleaning work was not complicated. 
<br>When cleaning the weather raw data, some repeating units (e.g.摄氏度, 天, 毫米) were deleted. Some data was misplaced (for example the "rainfall" data was put in the "rainydays" column) because of the differences in original webpages. So I had to placed them in correct columns. 
<br>The main task to clean restaurant raw data was also dealing with the misplaced data. Plus, in order to show which city the restaurant was located, new column was created based on the restaurant url. 
  
<br><br>
<b>Step3: </b>
<br>Clean data was put in airtable and here is the link of clean data:
<br>https://airtable.com/invite/l?inviteId=invcCU8m3eYGzKOKc&inviteToken=ee58ea86345ab264991295ddcc9426e8e497c842704f1a99d7eedc88688fc03a

