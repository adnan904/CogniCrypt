/********************************************************************************
 * Copyright (c) 2015-2018 TU Darmstadt This program and the accompanying materials are made available under the terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0. SPDX-License-Identifier: EPL-2.0
 ********************************************************************************/

package de.cognicrypt.crysl.reader;

import java.util.AbstractMap.SimpleEntry;
import java.util.ArrayList;
import java.util.List;
import java.util.Map.Entry;
import crypto.rules.CryptSLMethod;
import de.darmstadt.tu.crossing.cryptSL.Aggregate;
import de.darmstadt.tu.crossing.cryptSL.Event;
import de.darmstadt.tu.crossing.cryptSL.Method;
import de.darmstadt.tu.crossing.cryptSL.ObjectDecl;
import de.darmstadt.tu.crossing.cryptSL.Par;
import de.darmstadt.tu.crossing.cryptSL.ParList;
import de.darmstadt.tu.crossing.cryptSL.SuperType;

public class CrySLReaderUtils {

	protected static List<CryptSLMethod> dealWithAggregate(final Aggregate ev) {
		final List<CryptSLMethod> statements = new ArrayList<>();

		for (final Event lab : ev.getLab()) {
			if (lab instanceof Aggregate) {
				statements.addAll(dealWithAggregate((Aggregate) lab));
			} else {
				statements.add(stringifyMethodSignature(lab));
			}
		}
		return statements;
	}

	protected static String removeSPI(final String qualifiedName) {
		final int spiIndex = qualifiedName.lastIndexOf("Spi");
		final int dotIndex = qualifiedName.lastIndexOf(".");
		return (spiIndex == dotIndex - 3) ? qualifiedName.substring(0, spiIndex) + qualifiedName.substring(dotIndex) : qualifiedName;
	}

	protected static List<CryptSLMethod> resolveAggregateToMethodeNames(final Event leaf) {
		if (leaf instanceof Aggregate) {
			final Aggregate ev = (Aggregate) leaf;
			return dealWithAggregate(ev);
		} else {
			final ArrayList<CryptSLMethod> statements = new ArrayList<>();
			statements.add(stringifyMethodSignature(leaf));
			return statements;
		}
	}

	protected static CryptSLMethod stringifyMethodSignature(final Event lab) {
		final Method method = ((SuperType) lab).getMeth();

		String methodName = method.getMethName().getSimpleName();
		if (methodName == null) {
			methodName = ((de.darmstadt.tu.crossing.cryptSL.Domainmodel) (method.eContainer().eContainer().eContainer())).getJavaType().getSimpleName();
		}
		final String qualifiedName =
				((de.darmstadt.tu.crossing.cryptSL.Domainmodel) (method.eContainer().eContainer().eContainer())).getJavaType().getQualifiedName() + "." + methodName; // method.getMethName().getQualifiedName();
		// qualifiedName = removeSPI(qualifiedName);
		final List<Entry<String, String>> pars = new ArrayList<>();
		final de.darmstadt.tu.crossing.cryptSL.Object returnValue = method.getLeftSide();
		Entry<String, String> returnObject = null;
		if (returnValue != null && returnValue.getName() != null) {
			final ObjectDecl v = ((ObjectDecl) returnValue.eContainer());
			returnObject = new SimpleEntry<>(returnValue.getName(), v.getObjectType().getQualifiedName() + ((v.getArray() != null) ? v.getArray() : ""));
		} else {
			returnObject = new SimpleEntry<>("_", "void");
		}
		final ParList parList = method.getParList();
		if (parList != null) {
			for (final Par par : parList.getParameters()) {
				String parValue = "_";
				if (par.getVal() != null && par.getVal().getName() != null) {
					final ObjectDecl objectDecl = (ObjectDecl) par.getVal().eContainer();
					parValue = par.getVal().getName();
					final String parType = objectDecl.getObjectType().getIdentifier() + ((objectDecl.getArray() != null) ? objectDecl.getArray() : "");
					pars.add(new SimpleEntry<>(parValue, parType));

				} else {
					pars.add(new SimpleEntry<>(parValue, "AnyType"));
				}
			}
		}
		return new CryptSLMethod(qualifiedName, pars, new ArrayList<Boolean>(), returnObject);
	}
}
