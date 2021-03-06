<!doctype html>
<html data-ng-app=githubNav lang=en>
	<head>
		<meta charset=UTF-8>
		<meta name=viewport content="width=device-width, initial-scale=1">
		<title>Mini github navigator</title>
		<META NAME=ROBOTS CONTENT="NOINDEX, NOFOLLOW">
		<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel=stylesheet integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin=anonymous>
		<link href="css/main.css" rel=stylesheet>
	    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.3/angular.min.js"></script>
	    <script src="//cdnjs.cloudflare.com/ajax/libs/angular-sanitize/1.5.3/angular-sanitize.min.js"></script>
		<script src="js/main.js"></script>
	</head>
	<body data-ng-controller="mainCtrl as mainVm">
		<div id=w>
			<main class=md-inline-form>
				<section data-ng-class="{'center-search': mainVm.searchWasFilled === false}">
					<header>
						<div class=total-header data-ng-class="{'normal-search': mainVm.searchWasFilled === true}">
							<img src="img/g-logo.png" class="github-logo" alt="Github logo" data-ng-click="mainVm.goBackToHome()" /><h1 data-ng-click="mainVm.goBackToHome()">Github search</h1>
							<div class=main-search-label data-ng-class="{'main-search-label-none': mainVm.searchWasFilled === false, 'main-search-label-filled': mainVm.searchWasFilled === true}">
								<input type=text data-ng-model="mainVm.username" data-ng-change="mainVm.determinateChange(mainVm.username)">
							</div>
						</div>
					</header>
					<div class=search-results>
						<table class=generic-table>
							<thead data-ng-hide="mainVm.loadingUsernameSearch === true || mainVm.loadingUsernameSearch === 'more' || mainVm.loadingUsernameSearch === 'error' || mainVm.username === ''">
								<tr>
									<td>Username</td>
								</tr>
							</thead>
							<tbody>
								<tr data-ng-show="mainVm.loadingUsernameSearch === 'more' || mainVm.username === ''">
									<td>Fill search field with at least 4 characters.</td>
								</tr>
								<tr data-ng-show="mainVm.loadingUsernameSearch === true">
									<td>Loading</td>
								</tr>
								<tr data-ng-hide="mainVm.loadingUsernameSearch === true || mainVm.loadingUsernameSearch === 'more' || mainVm.loadingUsernameSearch === 'error' || mainVm.username === ''" data-ng-repeat="user in mainVm.usersLoaded track by $index">
									<td><img src="{{user.avatar_url}}" alt="{{user.login}}'s avatar" /> <span data-ng-bind="user.login"></span></td>
								</tr>
								<tr data-ng-show="mainVm.loadingUsernameSearch === 'error'">
									<td>Limit by Github API exceeded, please wait a minute, F12 and view console log for details.</td>
								</tr>
							</tbody>
						</table>
					</div>
				</section>
			</main>
		</div>
	</body>
</html>