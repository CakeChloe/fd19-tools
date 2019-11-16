<!DOCTYPE html>
<html>
	<head>
		<title>fd19</title>

		<link rel="stylesheet" type="text/css" href="styles/global.css">
	</head>
	<body>
		<div class="header">
			<div class="content">
				<div class="logo"></div>

				<p class="slogan">Employee Relations Graphic Tools</p>
			</div>
		</div>

		<div class="sidebar">
			<ul>
				<li>Temp. Index</li>
				<li class="selected">Twitter Post Tools</li>
			</ul>
		</div>

		<div class="container">
			<div class="box" style="position: relative;">
				<div class="head">Posting Account</div>
				<div class="content">
					<form>
						<fieldset>
							Account Name:
							<ul>
								<li>Presets:</li>
								<li onclick="$('#account-name').val('LSFD'); twitter.update()">@LAFD</li>,
								<li onclick="$('#account-name').val('LSFDtalk'); twitter.update()">@LAFDtalk</li>
							</ul>
						</fieldset>
						<input id="account-name" type="text" placeholder="LSFD" value="LSFD">

						<fieldset>
							Profile Name:
							<ul>
								<li>Presets:</li>
								<li onclick="$('#profile-name').val('LSFD'); twitter.update()">LAFD</li>,
								<li onclick="$('#profile-name').val('LSFD Talk'); twitter.update()">LAFD Talk</li>
							</ul>
						</fieldset>
						<input id="profile-name" type="text" placeholder="LSFD" value="LSFD">

						<fieldset>Profile Picture:</fieldset>
						<select id="profile-picture">
							<option value="0">@LAFD</option>
							<option value="1">LAFDtalk</option>
							<option value="2">DTLS</option>
						</select>

						<fieldset>Verified:</fieldset>
						<select id="verified">
							<option value="0">Yes</option>
							<option value="1">No</option>
						</select>
					</form>
				</div>

				<div class="box" id="canvas-box">
					<div class="head">Live Preview: <span onclick="twitter.render()">render</span></div>
					<div class="content" style="display: flex;">
						<canvas id="canvas" width="590" height="300" style="margin: auto"></canvas>
					</div>
				</div>
			</div>

			<div class="box">
				<div class="head">Post</div>
				<div class="content">
					<form>
						<fieldset>
							Preset Content:
						</fieldset>
						<select id="preset-content">
							<option value="0">None</option>
							<option value="1">@LAFD: Reminder</option>
							<option value="2">@LAFD: Incident Report</option>
							<option value="3">@LAFD: Incident Update</option>
							<option value="4">LAFDtalk: Reminder</option>
						</select>

						<fieldset>
							Content:
						</fieldset>
						<textarea id="content" placeholder="Enter Tweet content... (max 280 letters)" rows="6"></textarea>

						<fieldset>
							Date:
							<ul>
								<li>Presets:</li>
								<li onclick="let date = new Date(); $('#date-month').val(date.getMonth()); $('#date-day').val(date.getDate()); twitter.update()">Today</li>
							</ul>
						</fieldset>
						<div>
							<select id="date-month">
								<option value="0">January</option>
								<option value="1">February</option>
								<option value="2">March</option>
								<option value="3">April</option>
								<option value="4">May</option>
								<option value="5">June</option>
								<option value="6">July</option>
								<option value="7">August</option>
								<option value="8">September</option>
								<option value="9">October</option>
								<option value="10">November</option>
								<option value="11">December</option>
							</select>

							<input id="date-day" type="number" placeholder="Day" min="1" max="31" value="1">
						</div>

						<fieldset>Comments:</fieldset>
						
						<input id="comments" type="number" placeholder="Comments" min="0" max="10000" value="0">

						<fieldset>Retweets:</fieldset>
						
						<input id="retweets" type="number" placeholder="Retweets" min="0" max="10000" value="0">

						<fieldset>Likes:</fieldset>
						
						<input id="likes" type="number" placeholder="Likes" min="0" max="10000" value="0">
					</form>
				</div>
			</div>

			<div class="render">
				<div>
					<canvas id="render-canvas" width="590" height="300"></canvas>

					<div id="imgur">Upload to Imgur</div>
				</div>
			</div>
		</div>

		<script type="text/javascript" src="scripts/jquery-3.4.1.min.js"></script>
		<script type="text/javascript" src="scripts/twitter.js"></script>
	</body>
</html>