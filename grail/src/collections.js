import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {collection} from 'meteor/quarterto:synced-session';

export const Cards = new Mongo.Collection('cards');
export const SyncedSession = collection;

if(Meteor.isClient) {
	window.collections = exports;
	window.showCollection = (collection, ...args) => console.table(collection.find(...args));
	window.showCollections = (selector) =>
		Object.keys(collections)
			.filter(k => collections[k] instanceof Mongo.Collection)
			.forEach(k => {
				console.log(k);
				showCollection(collections[k], selector);
			});
}